import React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import {DocumentType} from "../../Content/Store/content.store";
import {DrawingDocument} from "../../../Drawing/Store/drawing-document";
import SelectionShapeView from "./selection-shape-view";

interface SelectionEditorViewProps {
}


const SelectionDocumentView: React.FC<SelectionEditorViewProps> = (props) => {
    //we need to listen to entire content here
    const content = useSelector((state: AppState) => state.content);
    const file = content.files[content.selectedIndex];

    if (file.type !== DocumentType.Drawing) {
        return <></>
    }
    const drawing = file as DrawingDocument


    return <SelectionShapeView document={drawing}/>
}

export default SelectionDocumentView;
