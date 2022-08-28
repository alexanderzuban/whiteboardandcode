import {inDispatchSelectedShapes} from "./drawing-select-operation-settings";
import {DrawingDocument} from "./drawing-document";
import inDispatchDocument from "./drawing-document-in-dispatch";
import {logger} from "../../Common/debug";


export function eraseInDispatch(document: DrawingDocument, shapes: number[]) {
    logger.log("eraseInDispatch", shapes)

    inDispatchDocument.removeShapes(document, shapes);
    inDispatchSelectedShapes.selectedClear(document)
}
