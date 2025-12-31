import {ShapeRect} from "./shape-rect";
import DrawigShapePainterBase from "../drawig-shape-painter-base";

export class ShapeRectPainter extends DrawigShapePainterBase {
    paint(shape: ShapeRect, context2d: CanvasRenderingContext2D): void {
        if (shape.boundingRect) {
            const maxX = shape.boundingRect.bottomRight.x;
            const maxY = shape.boundingRect.bottomRight.y;
            const minX = shape.boundingRect.topLeft.x;
            const minY = shape.boundingRect.topLeft.y;

            this.startPath(context2d);
            this.setupFromShape(context2d, shape);

            context2d.rect(minX, minY, maxX - minX, maxY - minY);

            this.fillShape(shape, context2d);
            this.strokeAndRestore(context2d);
        }
    }
}
