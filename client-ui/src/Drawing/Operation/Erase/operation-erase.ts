import {Nullable, withNullable} from "../../../Common/generics";
import {Point} from "../../../Common/point";
import {DrawingContext, DrawingShape, getShapeBehavior} from "../../Shape/shapes";
import {DrawingOperation, DrawingOperationHandler, Painter, SupportedOperations} from "../operations";
import {OperationErasePainter} from "./operation-erase-painter";
import {eraseInDispatch} from "../../Store/drawing-erase-operations-settings";
import {inDispatchSelectedShapes} from "../../Store/drawing-select-operation-settings";
import {CssCursors} from "../../../Common/css-cursors";

export interface OperationErase extends DrawingOperation {
    type: SupportedOperations.Erase,
    currentShape: Nullable<DrawingShape>;
    start: Point;
    end: Point;
}


export class OperationEraseHandler implements DrawingOperationHandler {
    start(context: DrawingContext, payload: Point): Nullable<OperationErase> {
        inDispatchSelectedShapes.selectedClear(context.document)
        return {
            type: SupportedOperations.Erase,
            currentShape: null,
            start: {
                x: payload.x,
                y: payload.y
            } as Point,
            end: {
                x: payload.x,
                y: payload.y
            } as Point,
        } as OperationErase;
    }

    cancel(operation: Nullable<OperationErase>, context: DrawingContext): Nullable<OperationErase> {
        return null;
    }

    update(operation: OperationErase, context: DrawingContext, payload: Point): OperationErase {
        operation.end = payload;
        return operation;
    }


    getPainter(): Nullable<Painter> {
        return new OperationErasePainter();
    }

    getOperationCursor(operation: Nullable<OperationErase>): CssCursors {
        return operation ? "crosshair" : "default";
    }

    end(operation: Nullable<OperationErase>, context: DrawingContext): Nullable<OperationErase> {
        return null;
    }

    complete(operation: Nullable<OperationErase>, context: DrawingContext, payload: Point): Nullable<OperationErase> {
        withNullable(operation, o => {
            const matching = context.document.shapes
                .filter(s =>
                    getShapeBehavior(s.type)?.isShapeTouchOrOverlap(s, o.start, o.end)
                )
                .map(s => s.key);


            eraseInDispatch(context.document, matching);
        })


        return null;
    }

    resume(operation: Nullable<OperationErase>, context: DrawingContext, payload: Point): Nullable<OperationErase> {
        return null;
    }
}
