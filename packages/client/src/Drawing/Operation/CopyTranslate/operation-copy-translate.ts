import {DrawingOperation, SupportedOperations} from "../operations";
import {isPointInsideRect, Point} from "../../../Common/point";
import {Nullable} from "../../../Common/generics";
import {DrawingContext} from "../../Shape/shapes";
import {OperationTranslate, OperationTranslateHandler} from "../Translate/operation-translate";
import inDispatchDocument from "../../Store/drawing-document-in-dispatch";


export class OperationCopyTranslateHandler extends OperationTranslateHandler {


    start(context: DrawingContext, payload: Point): Nullable<DrawingOperation> {
        if (context.document.selectedShapes.keys.length === 0) {
            return super.start(context, payload)
        } else {
            if (!isPointInsideRect(payload, context.document.selectedShapes.boundingRect)) {
                return super.start(context, payload)
            }
        }

        inDispatchDocument.cloneSelectedShapes(context.document)

        return {
            type: SupportedOperations.Translate,
            start: {
                x: payload.x,
                y: payload.y
            } as Point
        } as OperationTranslate;
    }
}
