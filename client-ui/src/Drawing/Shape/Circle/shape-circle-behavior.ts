import {DrawingContext, DrawingShapePainter, DrawingShapeStyleFeature, SupportedShapes} from "../shapes";
import {Point} from "../../../Common/point";
import {ShapeCirclePainter} from "./shape-circle-painter";
import {ShapeCircle} from "./shape-circle";
import DrawingShapeBehaviorBase from "../drawing-shape-behavior-base";
import NewShapeSettings from "../../Operation/NewShape/new-shape-settings";

export class ShapeCircleBehavior extends DrawingShapeBehaviorBase {
    getPainter(): DrawingShapePainter {
        return new ShapeCirclePainter();
    }

    newInstance(context: DrawingContext, start: Point): ShapeCircle {
        return this.initialShape(context, start, SupportedShapes.Circle, "Circle") as ShapeCircle;
    }

    demoInstance(size: number, profile?: NewShapeSettings): ShapeCircle {
        const start = {x: 2, y: 2} as Point;
        const shape =
            this.demoShape(start, SupportedShapes.Circle, "Circle", profile) as ShapeCircle;

        this.extendTo(shape, null, {x: size - 4, y: size - 4});

        return shape;
    }

    supportedStyleFeatures(): DrawingShapeStyleFeature[] {
        return [
            DrawingShapeStyleFeature.LineType,
            DrawingShapeStyleFeature.LineColor,
            DrawingShapeStyleFeature.LineWidth,
            DrawingShapeStyleFeature.FillStyle,
            DrawingShapeStyleFeature.FillColor
        ]
    }
}
