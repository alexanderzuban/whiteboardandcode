import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {ContentState} from "../../UI/Content/Store/content.store";
import {withCurrentTextDocument, withTextDocument} from "../../UI/Content/Store/content.store.common";

export const textDocumentUpdate: CaseReducer<ContentState, PayloadAction<string>>
    = function (state, action) {
    withCurrentTextDocument(state, document => {
        document.text = action.payload
    })
}


export const textDocumentSelectSyntax: CaseReducer<ContentState, PayloadAction<{
    uid: string,
    language: string
}>>
    = function (state, action) {
    withTextDocument(state, action.payload.uid, document => {
        document.language = action.payload.language
    })
}
