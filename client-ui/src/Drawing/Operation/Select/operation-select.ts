import {DrawingOperation, DrawingOperationHandler, Painter, SupportedOperations} from "../operations";
import {Point} from "../../../Common/point";
import {Nullable, withNullable} from "../../../Common/generics";
import {OperationSelectPainter} from "./operation-select-painter";
import {DrawingContext, getShapeBehavior} from "../../Shape/shapes";
import {inDispatchSelectedShapes} from "../../Store/drawing-select-operation-settings";
import {CssCursors} from "../../../Common/css-cursors";

export interface OperationSelect extends DrawingOperation {
    type: SupportedOperations.Select,
    start: Point;
    end: Point;
    reset: boolean;
    moved: boolean;
}


export class OperationSelectHandler implements DrawingOperationHandler {

    start(context: DrawingContext, payload: Point): Nullable<DrawingOperation> {
        return {
            type: SupportedOperations.Select,
            start: {
                x: payload.x,
                y: payload.y
            } as Point,
            end: {
                x: payload.x,
                y: payload.y
            } as Point,
            reset: true,
            moved: false
        } as OperationSelect;
    }

    update(operation: OperationSelect, context: DrawingContext, payload: { x: number, y: number }): OperationSelect {
        operation.end = payload;
        operation.moved = true;
        return operation;
    }

    getPainter(): Nullable<Painter> {
        return new OperationSelectPainter();
    }

    getOperationCursor(operation: Nullable<OperationSelect>): CssCursors {
        return operation ? "crosshair" : "default";
    }

    cancel(operation: Nullable<OperationSelect>, context: DrawingContext): Nullable<OperationSelect> {
        return null;
    }

    complete(operation: Nullable<OperationSelect>, context: DrawingContext, payload: any): Nullable<OperationSelect> {

        withNullable(operation, o => {
            const matching = context.document.shapes
                .filter(s =>
                    getShapeBehavior(s.type)?.isShapeTouchOrOverlap(s, o.start, o.end)
                )
                .map(s => s.key);
            if (matching.length === 0 && (o.reset || o.moved)) {
                inDispatchSelectedShapes.selectedClear(context.document)
            }
            if (matching.length > 0) {
                if (o.reset) {
                    inDispatchSelectedShapes.selectedClear(context.document)
                }
                inDispatchSelectedShapes.selectedAppend(context.document, matching)
            }
        })


        return null;
    }

    resume(operation: Nullable<OperationSelect>, context: DrawingContext, payload: any): Nullable<OperationSelect> {
        withNullable(operation, o => {
            o.reset = false;
        })

        return operation;
    }

    end(operation: Nullable<OperationSelect>, context: DrawingContext): Nullable<OperationSelect> {
        return null;
    }

}
