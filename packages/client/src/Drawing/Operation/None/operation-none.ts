import getOperationHandler, {
    DrawingOperation,
    DrawingOperationHandler,
    Painter,
    SupportedOperations
} from "../operations";
import {Nullable} from "../../../Common/generics";
import {DrawingContext} from "../../Shape/shapes";
import {CssCursors} from "../../../Common/css-cursors";
import {logger} from "../../../Common/debug";
import {Point} from "../../../Common/point";

export interface OperationNone extends DrawingOperation {
    type: SupportedOperations.None
}

export class OperationNoneHandler implements DrawingOperationHandler {

    start(context: DrawingContext, payload: Point): Nullable<DrawingOperation> {
        logger.debug("OperationNoneHandler", "start", payload)


        const translate = getOperationHandler(SupportedOperations.Translate)
        return translate?.start(context, payload)
    }

    update(operation: OperationNone, context: DrawingContext, payload: { x: number, y: number }): OperationNone {

        return operation;
    }

    getPainter(): Nullable<Painter> {
        return null;
    }

    getOperationCursor(operation: Nullable<OperationNone>): CssCursors {
        return "default";
    }

    cancel(operation: Nullable<OperationNone>, context: DrawingContext): Nullable<OperationNone> {
        return null;
    }

    complete(operation: Nullable<OperationNone>, context: DrawingContext, payload: any): Nullable<OperationNone> {

        return null;
    }

    resume(operation: Nullable<OperationNone>, context: DrawingContext, payload: any): Nullable<OperationNone> {


        return operation;
    }

    end(operation: Nullable<OperationNone>, context: DrawingContext): Nullable<OperationNone> {
        return null;
    }

}
