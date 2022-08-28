import {DrawingShape, DrawingShapePainter} from "./shapes";

export default abstract class DrawigShapePainterBase implements DrawingShapePainter {

    abstract paint(shape: DrawingShape, context2d: CanvasRenderingContext2D): void;


    protected setupFromShape(context2d: CanvasRenderingContext2D, shape: DrawingShape) {
        context2d.lineWidth = shape.lineWidth ?? 1;
        context2d.strokeStyle = shape.color ?? "black";
    }

    protected startPath(context2d: CanvasRenderingContext2D) {
        context2d.save();
        context2d.beginPath();
        context2d.translate(0.5, 0.5);
    }

    protected strokeAndRestore(context2d: CanvasRenderingContext2D) {
        context2d.stroke();
        context2d.restore();
    }

    protected fillShape(shape: DrawingShape, context2d: CanvasRenderingContext2D) {
        if (shape.fillColor) {
            context2d.fillStyle = shape.fillColor;
            context2d.fill();
        }
    }
}
