import {createSlice} from "@reduxjs/toolkit";
import {
    drawingOperationCancel,
    drawingOperationComplete,
    drawingOperationEnd,
    drawingOperationResume,
    drawingOperationStart,
    drawingOperationUpdate
} from "../../../Drawing/Store/drawing-operation";
import {
    drawingSelectAll,
    drawingSelectedAppend,
    drawingSelectedClear,
    drawingSelectedDelete,
    drawingSelectedRemove,
    drawingSelectedTranslate
} from "../../../Drawing/Store/drawing-select-operation-settings";
import {CssCursors} from "../../../Common/css-cursors";
import {newInfoDocument} from "../../../Text/Store/text-document";
import {drawingMoveOrigin} from "../../../Drawing/Store/drawing-document-in-dispatch";
import {deleteFile, newDrawingDocument, newTextDocument, selectFileForEdit} from "./content-in-dispatch";
import {newDrawingInstance} from "../../../Drawing/Store/drawing-document";
import {textDocumentSelectSyntax, textDocumentUpdate} from "../../../Text/Store/text-document-in-dispatch";

export enum DocumentType {
    Text,
    Drawing,
}


export interface ContentDocument {
    name: string,
    readonly type: DocumentType,
    readonly uid: string,
    unsaved: boolean
    sequence: number
}

export interface ContentState {
    files: ContentDocument[];
    selectedIndex: number;
    selectedUid: string;
    filesCount: number;
    drawingCursor: CssCursors
    counter: number;
}

const initialState = {
    files: [
        newInfoDocument(),
        newDrawingInstance()
    ],
    selectedIndex: 0,
    selectedUid: "0000-0000-0000-000",
    filesCount: 1,
    drawingCursor: "default",
    counter: 2
} as ContentState;


const sliceContent = createSlice({
    name: 'appContent',
    initialState,
    reducers: {
        drawingOperationStart,
        drawingOperationEnd,
        drawingOperationCancel,
        drawingOperationResume,
        drawingOperationUpdate,
        drawingOperationComplete,


        drawingSelectedAppend,
        drawingSelectedRemove,
        drawingSelectedClear,
        drawingSelectAll,
        drawingSelectedDelete,
        drawingSelectedTranslate,

        drawingMoveOrigin,

        newDrawingDocument,
        newTextDocument,
        selectFileForEdit,
        deleteFile,

        textDocumentUpdate,
        textDocumentSelectSyntax
    }
});


export const sliceActionsContent = sliceContent.actions;

export default sliceContent;
