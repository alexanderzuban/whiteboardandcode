import {OperationHover} from "./operation-hover";
import {Painter} from "../operations";
import {DrawingContext} from "../../Shape/shapes";


export class OperationHoverPainter implements Painter {
    paint(operation: OperationHover, context: DrawingContext, context2d: CanvasRenderingContext2D): void {
        if (!operation || !operation.currentShape || !operation.currentShape.boundingRect) {
            return;
        }

    }
}
