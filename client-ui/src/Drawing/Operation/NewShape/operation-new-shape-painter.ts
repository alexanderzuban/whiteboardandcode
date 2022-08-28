import {OperationNewShape} from "./operation-new-shape";
import {Painter} from "../operations";
import {DrawingContext, getShapeBehavior} from "../../Shape/shapes";


export class OperationNewShapePainter implements Painter {
    paint(operation: OperationNewShape, context: DrawingContext, context2d: CanvasRenderingContext2D): void {
        if (!operation || !operation.currentShape || !operation.currentShape.boundingRect) {
            return;
        }

        const maxX = operation.currentShape.boundingRect.bottomRight.x;
        const maxY = operation.currentShape.boundingRect.bottomRight.y;
        const minX = operation.currentShape.boundingRect.topLeft.x;
        const minY = operation.currentShape.boundingRect.topLeft.y;

        context2d.save();
        context2d.beginPath();
        context2d.translate(0.5, 0.5);
        context2d.lineWidth = 1;
        context2d.strokeStyle = "silver";
        context2d.setLineDash([10, 5]);
        context2d.rect(minX, minY, maxX - minX, maxY - minY);
        context2d.stroke();
        context2d.restore();

        getShapeBehavior(operation.currentShape.type) //
            ?.getPainter() //
            ?.paint(operation.currentShape, context2d);
    }
}
