import {Nullable, withNullable} from "../../../Common/generics";
import {ContentState, DocumentType} from "./content.store";
import {DrawingDocument} from "../../../Drawing/Store/drawing-document";
import {TextDocument} from "../../../Text/Store/text-document";

export function currentDrawingDocument(state: ContentState): Nullable<DrawingDocument> {
    if (state.selectedIndex >= 0 && state.selectedIndex < state.files.length) {
        const content = state.files[state.selectedIndex]
        if (content.type === DocumentType.Drawing) {
            return content as DrawingDocument
        }
    }
    return null
}

export function currentTextDocument(state: ContentState): Nullable<TextDocument> {
    if (state.selectedIndex >= 0 && state.selectedIndex < state.files.length) {
        const content = state.files[state.selectedIndex]
        if (content.type === DocumentType.Text) {
            return content as TextDocument
        }
    }
    return null
}


export function textDocument(state: ContentState, uid: string): Nullable<TextDocument> {
    return state.files.find(f => f.type === DocumentType.Text && f.uid === uid) as Nullable<TextDocument>;
}

export function drawingDocument(state: ContentState, uid: string): Nullable<DrawingDocument> {
    return state.files.find(f => f.type === DocumentType.Drawing && f.uid === uid) as Nullable<DrawingDocument>;
}

export function withCurrentDrawingDocument(state: ContentState, handler: (document: DrawingDocument) => void) {
    withNullable(currentDrawingDocument(state), handler);
}

export function withCurrentTextDocument(state: ContentState, handler: (document: TextDocument) => void) {
    withNullable(currentTextDocument(state), handler);
}


export function withTextDocument(state: ContentState, uid: string, handler: (document: TextDocument) => void) {
    withNullable(textDocument(state, uid), handler);
}

export function withDrawingDocument(state: ContentState, uid: string, handler: (document: DrawingDocument) => void) {
    withNullable(drawingDocument(state, uid), handler);
}
