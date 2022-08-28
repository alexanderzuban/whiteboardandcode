import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {withNullable} from "../../Common/generics";
import getOperationHandler, {SupportedOperations} from "../Operation/operations";
import {inDispatchSelectedShapes} from "./drawing-select-operation-settings";
import {DrawingSettings} from "./drawing-settings.store";
import {ContentState} from "../../UI/Content/Store/content.store";
import {withCurrentDrawingDocument} from "../../UI/Content/Store/content.store.common";
import {logger} from "../../Common/debug";

interface DrawingOperationPayload {
    settings: DrawingSettings,
    data?: any
}

export const drawingOperationResume: CaseReducer<ContentState,
    PayloadAction<DrawingOperationPayload>>
    = function (state, action) {

    withCurrentDrawingDocument(state, document => {
        if (document.operation == null) {
            return;
        }
        const context = {document, ...action.payload}

        withNullable(getOperationHandler(document.operation.type), handler => {

            const operation = handler.resume(document.operation, context, action.payload.data);
            if (operation !== null) {
                document.operation = operation;
                state.drawingCursor = handler.getOperationCursor(document.operation);
            }
        })
    })

}


export const drawingOperationStart: CaseReducer<ContentState, PayloadAction<DrawingOperationPayload & {
    operation: SupportedOperations
}>>
    = function (state, action) {
    withCurrentDrawingDocument(state, document => {
        const context = {document, ...action.payload}
        withNullable(getOperationHandler(action.payload.operation), handler => {
            const operation = handler.start(context, action.payload.data);
            logger.debug("Started operation", operation)
            if (operation) {
                document.operation = operation;
                state.drawingCursor = handler.getOperationCursor(document.operation);
            }
        })
    })
}

export const drawingOperationUpdate: CaseReducer<ContentState, PayloadAction<DrawingOperationPayload>>
    = function (state, action) {
    withCurrentDrawingDocument(state, document => {
        if (document.operation == null) {
            return;
        }
        const context = {document, ...action.payload}
        withNullable(getOperationHandler(document.operation.type), handler => {
            document.operation = handler.update(document.operation, context, action.payload.data);
        })
    })
}

export const drawingOperationEnd: CaseReducer<ContentState, PayloadAction<DrawingOperationPayload>>
    = function (state, action) {
    withCurrentDrawingDocument(state, document => {
        if (document.operation == null) {
            return
        }

        const context = {document, ...action.payload}
        withNullable(getOperationHandler(document.operation.type), handler => {
            document.operation = handler.end(document.operation, context);
            state.drawingCursor = handler.getOperationCursor(document.operation);
        })
    })
}
export const drawingOperationCancel: CaseReducer<ContentState, PayloadAction<DrawingOperationPayload>>
    = function (state, action) {
    withCurrentDrawingDocument(state, document => {
        if (document.operation == null) {
            inDispatchSelectedShapes.selectedClear(document)
            return
        }
        const context = {document, ...action.payload}
        withNullable(getOperationHandler(document.operation.type), handler => {
            document.operation = handler.cancel(document.operation, context);
            state.drawingCursor = handler.getOperationCursor(document.operation);
        })
    })
}

export const drawingOperationComplete: CaseReducer<ContentState, PayloadAction<DrawingOperationPayload>>
    = function (state, action) {
    withCurrentDrawingDocument(state, document => {
        if (document.operation == null) {
            return
        }
        const context = {document, ...action.payload}
        withNullable(getOperationHandler(document.operation.type), handler => {
            document.operation = handler.complete(document.operation, context, action.payload.data);
            state.drawingCursor = handler.getOperationCursor(document.operation);
        })
    })
}
