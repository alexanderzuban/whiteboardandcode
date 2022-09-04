import {
    DrawingContext,
    DrawingContextDocument,
    DrawingShape,
    DrawingShapeBehavior,
    DrawingShapePainter, DrawingShapeSettings,
    getShapeBehavior,
    SupportedShapes
} from "./shapes";
import {calcBoundingRect, calcBoundingRectForPointsArray, movePoint, Point, Rect} from "../../Common/point";
import {Nullable, withNullable} from "../../Common/generics";
import NewShapeProfile from "../Operation/NewShape/operation-new-shape-profile";
import inDispatchDocument from "../Store/drawing-document-in-dispatch";
import {DrawingShapeChangeType} from "../Store/drawing-document";
import {ShapeFreehand} from "./FreeHand/shape-freehand";
import {ShapeFreehandPainter} from "./FreeHand/shape-freehand-painter";


export default class DrawingShapeBehaviorBase implements DrawingShapeBehavior {

    protected initialShape(context: DrawingContext, start: Nullable<Point>, type: SupportedShapes, name: string): DrawingShape {

        const key = Date.now();

        return {
            type,
            key,
            name: `${name}`,

            start: start,
            end: start,

            boundingRect: {
                topLeft: start,
                bottomRight: start
            } as Rect,

            color: context.settings.newShapeSettings.lineColor ?? "black",
            lineWidth: context.settings.newShapeSettings.lineWidth ?? 1,
            fillColor: context.settings.newShapeSettings.fillColor ?? "",

            points: [],
            label: null,
            rotate: null
        } as DrawingShape;
    }

    shapeProfile(shape: DrawingShape): NewShapeProfile {
        const profile = {
            shape: shape.type,
            fillColor: shape.fillColor,
            fillStyle: shape.fillStyle,
            lineWidth: shape.lineWidth,
            lineColor: shape.color,
            lineType: shape.lineType
        } as NewShapeProfile
        return profile;
    }

    protected demoShape(start: Nullable<Point>, type: SupportedShapes, name: string, profile?: NewShapeProfile): DrawingShape {
        const key = -1;

        return {
            type,
            key,
            name,

            start: start,
            end: start,

            boundingRect: {
                topLeft: start,
                bottomRight: start
            } as Rect,

            color: profile?.lineColor ?? "black",
            lineWidth: profile?.lineWidth ?? 1,
            fillColor: profile?.fillColor ?? "",

            points: [],
            label: null,
            rotate: null
        } as DrawingShape;
    }

    extendTo(shape: DrawingShape, context: Nullable<DrawingContextDocument>, point: Point): DrawingShape {
        if (!shape.start) {
            shape.start = point;
        }
        const behaviour = getShapeBehavior(shape.type)

        if (behaviour.getPointsCount(shape) === 0) {
            behaviour.pushPoint(shape, shape.start)
        }

        shape.end = point;
        let rebuild = true;
        const size = behaviour.getPointsCount(shape)
        if (size > 1) {
            behaviour.setPointAt(shape, size - 1, shape.end)
        } else {
            behaviour.pushPoint(shape, shape.end)
            rebuild = false; //shapes only grow, so we can just extend bouning rect
        }

        this.updateBoundingRect(shape, rebuild);


        inDispatchDocument.recordChange(context?.document, DrawingShapeChangeType.Added, shape.key)

        return shape;
    }


    complete(shape: DrawingShape, context: Nullable<DrawingContextDocument>, point: Point, force: boolean): boolean {
        return false;
    }

    getPainter(): DrawingShapePainter {
        return (new class implements DrawingShapePainter {
            paint(shape: DrawingShape, context2d: CanvasRenderingContext2D): void {
            }
        }())
    }

    newInstance(context: DrawingContext, payload: any): DrawingShape {
        return {} as DrawingShape;
    };

    demoInstance(size: number, profile?: NewShapeProfile): DrawingShape {
        return {} as DrawingShape;
    };

    protected updateBoundingRect(shape: DrawingShape, rebuild: boolean) {
        if (!shape.boundingRect || rebuild) {
            withNullable(calcBoundingRectForPointsArray(shape.points), rect => {
                shape.boundingRect = rect;
            })
            rebuild = true;
        }

        if (!rebuild && shape.end && shape.boundingRect) {
            let y = shape.boundingRect.bottomRight.y;
            let x = shape.boundingRect.bottomRight.x;
            if (shape.end.y > y) {
                y = shape.end.y;
            }
            if (shape.end.x > x) {
                x = shape.end.x;
            }
            shape.boundingRect.bottomRight = {x, y};

            y = shape.boundingRect.topLeft.y;
            x = shape.boundingRect.topLeft.x;
            if (shape.end.y < y) {
                y = shape.end.y;
            }
            if (shape.end.x < x) {
                x = shape.end.x;
            }
            shape.boundingRect.topLeft = {x, y};
        }

    }

    getSettings(shape: DrawingShape): DrawingShapeSettings {
        return {
            suppressBoundingRectOnCreation:false
        } as DrawingShapeSettings;
    }

    translateShape(shape: DrawingShape, context: Nullable<DrawingContextDocument>, dx: number, dy: number): void {
        for (let index = 1; index < shape.points.length; index++) {
            shape.points[index] += (index % 2 !== 0 ? dx : dy)
        }


        withNullable(shape.start, p => movePoint(p, dx, dy));
        withNullable(shape.end, p => movePoint(p, dx, dy));
        withNullable(shape.boundingRect, rect => {
            movePoint(rect.topLeft, dx, dy)
            movePoint(rect.bottomRight, dx, dy)
        })

        inDispatchDocument.recordChange(context?.document, DrawingShapeChangeType.Updated, shape.key)
    }

    isShapeTouchOrOverlap(shape: DrawingShape, ...points: Point[]): boolean {
        const boundingRect = calcBoundingRect(...points);

        if (!boundingRect || !shape.boundingRect) {
            return false;
        }

        if (!boundingRect.topLeft || !boundingRect.bottomRight || !shape.boundingRect.topLeft || !shape.boundingRect.bottomRight) {
            return false;
        }

        // If one rectangle is on left side of other
        if (boundingRect.topLeft.x > shape.boundingRect.bottomRight.x || shape.boundingRect.topLeft.x > boundingRect.bottomRight.x) {
            return false;
        }

        // If one rectangle is above other
        if (boundingRect.topLeft.y > shape.boundingRect.bottomRight.y || shape.boundingRect.topLeft.y > boundingRect.bottomRight.y) {
            return false;
        }

        return true;
    }

    getPointsCount(shape: DrawingShape): number {
        if (shape.points.length > 1) {
            return (shape.points.length - 1) / 2
        }
        return 0
    }

    getPointAt(shape: DrawingShape, index: number): Point {
        return {x: shape.points[index * 2 + 1], y: shape.points[index * 2 + 2]}
    }

    setPointAt(shape: DrawingShape, index: number, point: Point) {
        shape.points[index * 2 + 1] = point.x
        shape.points[index * 2 + 2] = point.y
    }


    pushPoint(shape: DrawingShape, point: Point): number {
        if (shape.points.length === 0) {
            shape.points.push(777)//for indexing simplicity ignore first element
        }

        shape.points.push(point.x)
        shape.points.push(point.y)

        return this.getPointsCount(shape)
    }

    removePointAt(shape: DrawingShape, index: number): number {
        if (index === (this.getPointsCount(shape) - 1)) {
            shape.points = shape.points.slice(0, index * 2 + 1)
        } else {
            const before = shape.points.slice(0, index * 2 + 1)
            const after = shape.points.slice(index * 2 + 3)
            shape.points = [...before, ...after]
        }
        return this.getPointsCount(shape)
    }

    iteratePoints(shape: DrawingShape, consumer: (x: number, y: number, index: number) => void) {

        for (let index = 1; index < shape.points.length; index += 2) {
            consumer(shape.points[index], shape.points[index + 1], (index - 1) / 2)
        }

    }
}
