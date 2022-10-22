import React, {useMemo} from "react";
import {logger} from "../../Common/debug";
import DrawingView from "../Drawing/drawing-view";
import {useSelector} from "react-redux";
import appStore, {AppState} from "../../Store/App.store";
import TextDocumentView from "../../Text/text-document-view";
import HotKeyDispatcher from "../Drawing/HotKey/hot-key-dispatcher";
import HotKeyPanel from "../Drawing/HotKey/hot-key-panel";
import DrawingKeyboardListener from "../Drawing/drawing-keyboard-listener";
import {DocumentType} from "./Store/content.store";

const ContentView: React.FC = () => {
    logger.render("ContentView");

    const drawing = useMemo(() => <>
        <DrawingView/>
    </>, [])

    const text = useMemo(() => <TextDocumentView/>, [])
    const selected = useSelector((state: AppState) => state.content.selectedUid);

    const document = appStore.getState().content.files.find(f => f.uid === selected)
    if (document?.type === DocumentType.Drawing) {
        return <>
            <DrawingKeyboardListener/>
            <HotKeyDispatcher/>
            <HotKeyPanel/>
            {drawing}
        </>;
    }

    return text;
}

export default ContentView;
