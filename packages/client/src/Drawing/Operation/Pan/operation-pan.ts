import {Nullable} from "../../../Common/generics";
import {Point} from "../../../Common/point";
import {DrawingOperation, DrawingOperationHandler, Painter, SupportedOperations} from "../operations";
import {DrawingContext} from "../../Shape/shapes";
import {CssCursors} from "../../../Common/css-cursors";


export interface OperationPan extends DrawingOperation {
    type: SupportedOperations.Pan,
    start: Point;
}

export class OperationPanHandler implements DrawingOperationHandler {

    start(context: DrawingContext, payload: Point): Nullable<DrawingOperation> {
        return {
            type: SupportedOperations.Pan,
            start: {
                x: payload.x - context.document.origin.x,
                y: payload.y - context.document.origin.y
            } as Point
        } as OperationPan;
    }

    update(operation: OperationPan, context: DrawingContext, payload: { x: number, y: number }): OperationPan {
        const movedTo = {
            x: payload.x - context.document.origin.x,
            y: payload.y - context.document.origin.y
        } as Point

        const dx = movedTo.x - operation.start.x;
        const dy = movedTo.y - operation.start.y;
        const origin = context.document.origin;
        context.document.origin = {x: origin.x - dx, y: origin.y - dy} as Point;
        return {
            start: movedTo,
            type: SupportedOperations.Pan
        } as OperationPan;
    }

    getPainter(): Nullable<Painter> {
        return null;
    }

    getOperationCursor(operation: Nullable<DrawingOperation>): CssCursors {
        return operation ? "grab" : "default";
    }

    cancel(operation: Nullable<DrawingOperation>, context: DrawingContext): Nullable<DrawingOperation> {
        return null;
    }

    complete(operation: Nullable<DrawingOperation>, context: DrawingContext, payload: any): Nullable<DrawingOperation> {
        return null;
    }

    resume(operation: Nullable<DrawingOperation>, context: DrawingContext, payload: any): Nullable<DrawingOperation> {
        return null
    }

    end(operation: Nullable<DrawingOperation>, context: DrawingContext): Nullable<DrawingOperation> {
        return null;
    }

}
