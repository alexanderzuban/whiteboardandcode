import {DrawingShape, DrawingShapePainter} from "./shapes";

export default abstract class DrawigShapePainterBase implements DrawingShapePainter {

    abstract paint(shape: DrawingShape, context2d: CanvasRenderingContext2D): void;


    protected setupFromShape(context2d: CanvasRenderingContext2D, shape: DrawingShape) {
        context2d.lineWidth = shape.style?.lineWidth ?? 1;
        context2d.strokeStyle = shape.style?.lineColor ?? "black";
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
        if (shape.style?.fillColor) {
            context2d.fillStyle = shape.style?.fillColor;
            context2d.fill();
        }
    }
}
