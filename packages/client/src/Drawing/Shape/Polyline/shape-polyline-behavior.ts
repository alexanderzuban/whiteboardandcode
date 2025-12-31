import {
    DrawingContext,
    DrawingContextDocument,
    DrawingShapePainter,
    DrawingShapeStyleFeature,
    getShapeBehavior,
    SupportedShapes
} from "../shapes";
import {Point} from "../../../Common/point";
import {ShapePolyline} from "./shape-polyline";
import {ShapePolylinePainter} from "./shape-polyline-painter";
import DrawingShapeBehaviorBase from "../drawing-shape-behavior-base";
import inDispatchDocument from "../../Store/drawing-document-in-dispatch";
import {DrawingShapeChangeType} from "../../Store/drawing-document";
import {Nullable} from "../../../Common/generics";
import NewShapeSettings from "../../Operation/NewShape/new-shape-settings";

export class ShapePolylineBehavior extends DrawingShapeBehaviorBase {
    getPainter(): DrawingShapePainter {
        return new ShapePolylinePainter();
    }

    newInstance(context: DrawingContext, start: Point): ShapePolyline {
        return this.initialShape(context, start, SupportedShapes.Polyline, "Polyline") as ShapePolyline;
    }

    complete(shape: ShapePolyline, context: Nullable<DrawingContextDocument>, point: Point, force: boolean): boolean {
        const behaviour = getShapeBehavior(shape.type)
        if (!force) {
            this.pushPoint(shape, point)
        } else {
            behaviour.removePointAt(shape, behaviour.getPointsCount(shape) - 1)
            shape.end = behaviour.getPointAt(shape, behaviour.getPointsCount(shape) - 1);
        }

        this.updateBoundingRect(shape, true);

        inDispatchDocument.recordChange(context?.document, DrawingShapeChangeType.Updated, shape.key)

        return !force;
    }


    demoInstance(size: number, profile?: NewShapeSettings): ShapePolyline {
        const start = {x: 2, y: size / 2} as Point;
        const shape = this.demoShape(start, SupportedShapes.Polyline, "Polyline", profile) as ShapePolyline;
        this.extendTo(shape, null, start);
        this.complete(shape, null, {x: size / 3, y: size / 4 * 3}, false);
        this.complete(shape, null, {x: size / 3 * 2, y: size / 4}, false);
        this.complete(shape, null, {x: size - 4, y: size / 2}, false)

        return shape;
    }

    supportedStyleFeatures(): DrawingShapeStyleFeature[] {
        return [
            DrawingShapeStyleFeature.LineType,
            DrawingShapeStyleFeature.LineColor,
            DrawingShapeStyleFeature.LineWidth,
            DrawingShapeStyleFeature.LineStart,
            DrawingShapeStyleFeature.LineEnd
        ]
    }
}
