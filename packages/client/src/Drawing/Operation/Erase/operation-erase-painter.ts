import {OperationErase} from "./operation-erase";
import {Painter} from "../operations";
import {appTheme} from "../../../Style/theme";
import {DrawingContext} from "../../Shape/shapes";


export class OperationErasePainter implements Painter {
    paint(operation: OperationErase, context: DrawingContext, context2d: CanvasRenderingContext2D): void {
        if (!operation || !operation.start || !operation.end) {
            return;
        }
        const maxX = operation.start.x;
        const maxY = operation.start.y;
        const minX = operation.end.x;
        const minY = operation.end.y;

        context2d.save();
        context2d.beginPath();
        context2d.translate(0.5, 0.5);
        context2d.lineWidth = 1;
        context2d.strokeStyle = appTheme.ui.selectionColor;

        context2d.setLineDash([10, 5]);
        context2d.rect(minX, minY, maxX - minX, maxY - minY);
        context2d.fillStyle = appTheme.ui.selectionFillColor;
        context2d.fill();
        context2d.stroke();
        context2d.restore();
    }
}
