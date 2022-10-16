import {DrawingContext, DrawingShapePainter, SupportedShapes} from "../shapes";
import {ShapeRectPainter} from "./shape-rect-painter";
import {Point} from "../../../Common/point";
import {ShapeRect} from "./shape-rect";
import DrawingShapeBehaviorBase from "../drawing-shape-behavior-base";
import NewShapeSettings from "../../Operation/NewShape/new-shape-settings";

export class ShapeRectBehavior extends DrawingShapeBehaviorBase {
    getPainter(): DrawingShapePainter {
        return new ShapeRectPainter();
    }


    newInstance(context: DrawingContext, start: Point): ShapeRect {
        return this.initialShape(context, start, SupportedShapes.Rect, "Rect") as ShapeRect;
    }


    demoInstance(size: number, profile?: NewShapeSettings): ShapeRect {
        const start = {x: 2, y: 2} as Point;
        const shape = this.demoShape(start, SupportedShapes.Rect, "Rect", profile) as ShapeRect;

        this.extendTo(shape, null, {x: size - 4, y: size - 4});

        return shape;
    }
}
