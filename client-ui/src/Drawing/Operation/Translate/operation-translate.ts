import getOperationHandler, {
    DrawingOperation,
    DrawingOperationHandler,
    Painter,
    SupportedOperations
} from "../operations";
import {isPointInsideRect, Point} from "../../../Common/point";
import {Nullable} from "../../../Common/generics";
import {inDispatchSelectedShapes} from "../../Store/drawing-select-operation-settings";
import {DrawingContext} from "../../Shape/shapes";
import {CssCursors} from "../../../Common/css-cursors";
import inDispatchDocument from "../../Store/drawing-document-in-dispatch";

export interface OperationTranslate extends DrawingOperation {
    type: SupportedOperations.Translate,
    start: Point;
    end: Point;
}


export class OperationTranslateHandler implements DrawingOperationHandler {


    start(context: DrawingContext, payload: Point): Nullable<DrawingOperation> {
        if (context.document.selectedShapes.keys.length === 0) {
            inDispatchDocument.selectShapeUnder(context.document, payload);
        } else {
            if (!isPointInsideRect(payload, context.document.selectedShapes.boundingRect)) {
                inDispatchDocument.selectShapeUnder(context.document, payload);
            }
        }

        if (context.document.selectedShapes.keys.length === 0) {
            //nothing to move, act as selection operation
            return getOperationHandler(SupportedOperations.Select)?.start(context, payload);
        }

        return {
            type: SupportedOperations.Translate,
            start: {
                x: payload.x,
                y: payload.y
            } as Point
        } as OperationTranslate;
    }

    update(operation: OperationTranslate, context: DrawingContext, payload: { x: number, y: number }): OperationTranslate {


        const dx = payload.x - operation.start.x
        const dy = payload.y - operation.start.y

        if (dy * dy > 0 || dx * dx > 0) {
            inDispatchSelectedShapes.translate(context.document, {dx, dy});

            operation.start = payload;
        }

        return operation;
    }

    getPainter(): Nullable<Painter> {
        return null;
    }

    getOperationCursor(operation: Nullable<OperationTranslate>): CssCursors {
        return operation ? "move" : "default";
    }

    cancel(operation: Nullable<OperationTranslate>, context: DrawingContext): Nullable<OperationTranslate> {
        return null;
    }

    complete(operation: Nullable<OperationTranslate>, context: DrawingContext, payload: any): Nullable<OperationTranslate> {
        return null;
    }

    resume(operation: Nullable<OperationTranslate>, context: DrawingContext, payload: any): Nullable<OperationTranslate> {
        return null
    }

    end(operation: Nullable<OperationTranslate>, context: DrawingContext): Nullable<OperationTranslate> {
        return null;
    }

}
