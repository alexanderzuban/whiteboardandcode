import {DrawingContext, DrawingShapePainter, DrawingShapeStyleFeature, SupportedShapes} from "../shapes";
import {Point} from "../../../Common/point";
import {ShapeLinePainter} from "./shape-line-painter";
import {ShapeLine} from "./shape-line";
import DrawingShapeBehaviorBase from "../drawing-shape-behavior-base";
import NewShapeSettings from "../../Operation/NewShape/new-shape-settings";

export class ShapeLineBehavior extends DrawingShapeBehaviorBase {
    getPainter(): DrawingShapePainter {
        return new ShapeLinePainter();
    }

    newInstance(context: DrawingContext, start: Point): ShapeLine {
        return this.initialShape(context, start, SupportedShapes.Line, "Line") as ShapeLine;
    }

    demoInstance(size: number, profile?: NewShapeSettings): ShapeLine {
        const start = {x: 2, y: 2} as Point;
        const shape = this.demoShape(start, SupportedShapes.Line, "Line", profile) as ShapeLine;
        this.extendTo(shape, null, {x: size - 4, y: size - 4});

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
