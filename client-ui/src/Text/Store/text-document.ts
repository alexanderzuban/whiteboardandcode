import {ContentDocument, DocumentType} from "../../UI/Content/Store/content.store";
import {v4} from "uuid";


export interface TextDocument extends ContentDocument {
    text: string;
    language: string;
}


export function newTextDocumentInstance(): TextDocument {
    return {
        uid: v4(),
        type: DocumentType.Text,
        name: "New Document",
        text: "",
        language: "plaintext",
        unsaved: true
    } as TextDocument
}


//TODO fill description
export function newInfoDocument(): TextDocument {
    return {
        uid: v4(),
        type: DocumentType.Text,
        name: "Information",
        text: "This hello document",
        language: "plaintext",
        unsaved: false
    } as TextDocument
}
