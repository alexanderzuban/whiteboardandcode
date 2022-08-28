import {ShapeLine} from "./shape-line";
import DrawigShapePainterBase from "../drawig-shape-painter-base";

export class ShapeLinePainter extends DrawigShapePainterBase {
    paint(shape: ShapeLine, context2d: CanvasRenderingContext2D): void {
        if (shape.start && shape.end) {

            this.startPath(context2d);
            this.setupFromShape(context2d, shape);

            context2d.moveTo(shape.start.x, shape.start.y);
            context2d.lineTo(shape.end.x, shape.end.y);

            this.fillShape(shape, context2d);
            this.strokeAndRestore(context2d);
        }
    }
}
