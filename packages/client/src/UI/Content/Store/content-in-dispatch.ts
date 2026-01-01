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

export const renameFile: CaseReducer<ContentState, PayloadAction<{uid: string, name: string}>>
    = function (state, action) {
    const file = state.files.find(f => f.uid === action.payload.uid);
    if (file) {
        file.name = action.payload.name;
        file.unsaved = true;
    }
}

export const markFileSaved: CaseReducer<ContentState, PayloadAction<string>>
    = function (state, action) {
    const file = state.files.find(f => f.uid === action.payload);
    if (file) {
        file.unsaved = false;
    }
}

export const closeOtherFiles: CaseReducer<ContentState, PayloadAction<string>>
    = function (state, action) {
    const keepUid = action.payload;
    state.files = state.files.filter(f => f.uid === keepUid);
    state.filesCount = state.files.length;
    state.selectedIndex = 0;
    state.selectedUid = keepUid;
}

export const closeFilesToLeft: CaseReducer<ContentState, PayloadAction<string>>
    = function (state, action) {
    const index = state.files.findIndex(f => f.uid === action.payload);
    if (index > 0) {
        state.files = state.files.slice(index);
        state.filesCount = state.files.length;
        state.selectedIndex = 0;
        state.selectedUid = state.files[0].uid;
    }
}

export const closeFilesToRight: CaseReducer<ContentState, PayloadAction<string>>
    = function (state, action) {
    const index = state.files.findIndex(f => f.uid === action.payload);
    if (index >= 0 && index < state.files.length - 1) {
        state.files = state.files.slice(0, index + 1);
        state.filesCount = state.files.length;
        state.selectedIndex = index;
        state.selectedUid = state.files[index].uid;
    }
}

export const closeSavedFiles: CaseReducer<ContentState>
    = function (state) {
    const currentUid = state.selectedUid;
    state.files = state.files.filter(f => f.unsaved);
    state.filesCount = state.files.length;

    // Try to keep current selection, or select first file
    const currentIndex = state.files.findIndex(f => f.uid === currentUid);
    if (currentIndex >= 0) {
        state.selectedIndex = currentIndex;
        state.selectedUid = currentUid;
    } else if (state.files.length > 0) {
        state.selectedIndex = 0;
        state.selectedUid = state.files[0].uid;
    }
}

