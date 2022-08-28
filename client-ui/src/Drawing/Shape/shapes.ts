import {Point, Rect} from "../../Common/point";
import {Nullable} from "../../Common/generics";
import {ShapeRectBehavior} from "./Rect/shape-rect-behavior";
import {ShapeLineBehavior} from "./Line/shape-line-behavior";
import {ShapeCircleBehavior} from "./Circle/shape-circle-behavior";
import {ShapeFreehandBehavior} from "./FreeHand/shape-freehand-behavior";
import {ShapePolylineBehavior} from "./Polyline/shape-polyline-behavior";
import NewShapeProfile from "../Operation/NewShape/operation-new-shape-profile";
import {DrawingSettings} from "../Store/drawing-settings.store";
import {DrawingDocument} from "../Store/drawing-document";
import DrawingShapeBehaviorBase from "./drawing-shape-behavior-base";

export enum SupportedShapes {
    None,
    Rect,
    Circle,
    Line,
    Freehand,
    Polyline
}


export interface DrawingContextDocument {
    document: DrawingDocument
}

export interface DrawingContext extends DrawingContextDocument {
    settings: DrawingSettings
}

export interface DrawingShape {
    type: SupportedShapes;
    key: number;
    name: Nullable<String>,
    points: number[];

    start: Nullable<Point>;
    end: Nullable<Point>;

    boundingRect: Nullable<Rect>;

    color: Nullable<string>;
    fillColor: Nullable<string>;
    fillStyle?: Nullable<string>;
    label: Nullable<string>;
    rotate: Nullable<number>;
    lineWidth?: number;
    lineType?: Nullable<string>;
}

export interface DrawingShapePainter {
    paint(shape: DrawingShape, context2d: CanvasRenderingContext2D): void;
}

export interface DrawingShapeBehavior {
    newInstance(drawing: DrawingContext, payload: any): DrawingShape;

    demoInstance(size: number, profile?: NewShapeProfile): DrawingShape;

    extendTo(shape: DrawingShape, context: Nullable<DrawingContextDocument>, point: Point): DrawingShape;

    getPainter(): DrawingShapePainter;

    complete(shape: DrawingShape, context: Nullable<DrawingContextDocument>, point: Point, force: boolean): boolean;

    translateShape(shape: DrawingShape, context: Nullable<DrawingContextDocument>, dx: number, dy: number): void;

    isShapeTouchOrOverlap(shape: DrawingShape, ...points: Point[]): boolean;

    shapeProfile(shape: DrawingShape): NewShapeProfile;


    getPointsCount(shape: DrawingShape): number

    getPointAt(shape: DrawingShape, index: number): Point

    setPointAt(shape: DrawingShape, index: number, point: Point): void

    removePointAt(shape: DrawingShape, index: number): number

    pushPoint(shape: DrawingShape, point: Point): number

    iteratePoints(shape: DrawingShape, consumer: (x: number, y: number, index: number) => void): void

}


const ShapesLookup = new Map<SupportedShapes, DrawingShapeBehavior>([
    [SupportedShapes.Rect, new ShapeRectBehavior()],
    [SupportedShapes.Line, new ShapeLineBehavior()],
    [SupportedShapes.Circle, new ShapeCircleBehavior()],
    [SupportedShapes.Polyline, new ShapePolylineBehavior()],
    [SupportedShapes.Freehand, new ShapeFreehandBehavior()]
]);

export function getShapeBehavior(shapeType: SupportedShapes): DrawingShapeBehavior {
    return ShapesLookup.get(shapeType) ?? new DrawingShapeBehaviorBase();
}
