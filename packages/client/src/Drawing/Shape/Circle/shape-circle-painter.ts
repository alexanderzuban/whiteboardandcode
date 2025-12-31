import {ShapeCircle} from "./shape-circle";
import DrawigShapePainterBase from "../drawig-shape-painter-base";

export class ShapeCirclePainter extends DrawigShapePainterBase {
    paint(shape: ShapeCircle, context2d: CanvasRenderingContext2D): void {
        if (shape.boundingRect) {
            const maxX = shape.boundingRect.bottomRight.x;
            const maxY = shape.boundingRect.bottomRight.y;
            const minX = shape.boundingRect.topLeft.x;
            const minY = shape.boundingRect.topLeft.y;

            const centerX = minX + (maxX - minX) / 2;
            const centerY = minY + (maxY - minY) / 2;
            const radiusX = Math.abs((maxX - minX) / 2);
            const radiusY = Math.abs((maxY - minY) / 2);

            this.startPath(context2d);
            this.setupFromShape(context2d, shape);

            context2d.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);


            this.fillShape(shape, context2d);
            this.strokeAndRestore(context2d);
        }
    }
}
