import {Nullable} from "../../../Common/generics";
import {Point} from "../../../Common/point";
import {DrawingContext, DrawingShape} from "../../Shape/shapes";
import {DrawingOperation, DrawingOperationHandler, Painter, SupportedOperations} from "../operations";
import {OperationHoverPainter} from "./operation-hover-painter";
import {CssCursors} from "../../../Common/css-cursors";

export interface OperationHover extends DrawingOperation {
    type: SupportedOperations.Hover,
    currentShape: Nullable<DrawingShape>;
}


export class OperationHoverHandler implements DrawingOperationHandler {
    start(context: DrawingContext, payload: Point): Nullable<OperationHover> {
        return {
            type: SupportedOperations.Hover,
            currentShape: null
        } as OperationHover;
    }

    cancel(operation: Nullable<OperationHover>, context: DrawingContext): Nullable<OperationHover> {
        return null;
    }

    update(operation: OperationHover, context: DrawingContext, payload: Point): OperationHover {


        return operation;
    }


    getPainter(): Nullable<Painter> {
        return new OperationHoverPainter();
    }

    getOperationCursor(operation: Nullable<OperationHover>): CssCursors {
        return "default";
    }

    end(operation: Nullable<OperationHover>, context: DrawingContext): Nullable<OperationHover> {
        return null;
    }

    complete(operation: Nullable<OperationHover>, context: DrawingContext, payload: Point): Nullable<OperationHover> {
        return null;
    }

    resume(operation: Nullable<OperationHover>, context: DrawingContext, payload: Point): Nullable<OperationHover> {
        return null;
    }
}
