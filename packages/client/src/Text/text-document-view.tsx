import React from "react";
import {logger} from "../Common/debug";
import Editor, {Monaco} from "@monaco-editor/react";
import {useDispatch, useSelector} from "react-redux";
import appStore, {AppState} from "../Store/App.store";
import {TextDocument} from "./Store/text-document";
import {DocumentType, sliceActionsContent} from "../UI/Content/Store/content.store";
import type monaco from 'monaco-editor'
import TextDocumentSelectLanguageDialog from "./text-document-select-language-dialog";
import {sliceActionsTextEditor, TextEditorLanguage} from "./Store/text-editor-settings.store";
import {useModalDialog} from "../UI/Component/Modal/useModalDialog";


const TextDocumentView: React.FC = (props) => {
    logger.render("TextDocumentView")

//    const settings = useSelector((state: AppState) => state.textSettings)
    const selectedDocument = useSelector((state: AppState) => state.content.selectedUid);
    const state = appStore.getState()
    const file = state.content.files.find(f => f.uid === selectedDocument);
    const size = useSelector((state: AppState) => state.appView.contentSize);
    const dispatch = useDispatch();

    const selectLanguageDialog = useModalDialog("Select language syntax", (props) => {
        return <TextDocumentSelectLanguageDialog hide={props.hide} uid={file?.uid ?? ""}/>
    });

    if (!file || file.type !== DocumentType.Text) {
        return <></>
    }
    const document = file as TextDocument

    const onDocumentChanged = (value: (string | undefined)) => {
        dispatch(sliceActionsContent.textDocumentUpdate(value ?? ""))
    }


    const onEditorMounted = (editor: monaco.editor.IStandaloneCodeEditor, m: Monaco) => {
        editor.addAction({
            id: "setLanguage",
            label: "Set Language Syntax",
            keybindings: [m.KeyMod.CtrlCmd | m.KeyCode.KeyL],
            contextMenuGroupId: "2_customoptions",

            run: editor => {
                selectLanguageDialog.show()
            }
        });

        const languages = m.languages.getLanguages()
            .sort((a, b) => a.id.localeCompare(b.id))
            .map(l => {
                    const description = (l.aliases?.length ?? 0) > 0 ? l.aliases![0] : l.id
                    const lang = {
                        uid: l.id,
                        description
                    } as TextEditorLanguage
                    return lang
                }
            )
        dispatch(sliceActionsTextEditor.initLanguages(languages))
    };


    return <>
        {selectLanguageDialog.ui}

        <Editor
            height={size.height}
            width={size.width}
            theme="light"
            onMount={onEditorMounted}
            language={document.language}
            path={file.name}
            onChange={onDocumentChanged}
            defaultValue={document.text}
        />
    </>;
}

export default TextDocumentView;
