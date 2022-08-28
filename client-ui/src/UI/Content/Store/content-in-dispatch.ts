import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {ContentDocument, ContentState} from "./content.store";
import {newTextDocumentInstance} from "../../../Text/Store/text-document";
import {newDrawingInstance} from "../../../Drawing/Store/drawing-document";

class ContentStateInDispatch {

    appendNewFile(state: ContentState, file: ContentDocument) {
        file.name = "New File " + state.counter;
        state.counter = state.counter + 1

        state.files.push(file)
        state.filesCount = state.files.length
        state.selectedIndex = state.files.length - 1
        state.selectedUid = state.files[state.selectedIndex].uid
    }

    selectFileByIndex(state: ContentState, index: number) {
        if (index >= 0 && index < state.files.length) {
            state.selectedIndex = index
            state.selectedUid = state.files[state.selectedIndex].uid
        } else {
            state.selectedIndex = state.files.length - 1
            state.selectedUid = state.files[state.selectedIndex].uid
        }
    }

    selectFileByUid(state: ContentState, uid: string) {
        const index = state.files.findIndex(d => d.uid === uid);
        if (index >= 0) {
            this.selectFileByIndex(state, index)
        }
    }

    deleteFileByUid(state: ContentState, uid: string) {
        const index = state.files.findIndex(d => d.uid === uid);
        if (index >= 0) {
            state.files = state.files.filter(d => d.uid !== uid);
            state.filesCount = state.files.length

            this.selectFileByIndex(state, index)
        }
    }
}

export const inDispatchContentState = new ContentStateInDispatch();


export const newTextDocument: CaseReducer<ContentState>
    = function (state) {
    const file = newTextDocumentInstance()
    inDispatchContentState.appendNewFile(state, file)
}


export const newDrawingDocument: CaseReducer<ContentState>
    = function (state) {
    const file = newDrawingInstance()
    inDispatchContentState.appendNewFile(state, file)
}

export const selectFileForEdit: CaseReducer<ContentState, PayloadAction<string>>
    = function (state, action) {
    inDispatchContentState.selectFileByUid(state, action.payload)
}

export const deleteFile: CaseReducer<ContentState, PayloadAction<string>>
    = function (state, action) {
    inDispatchContentState.deleteFileByUid(state, action.payload)
}

