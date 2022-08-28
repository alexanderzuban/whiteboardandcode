import React from "react";
import {HotKeyCategory, SupportedHotKeyCategories} from "./hotkeys.store";
import HotKeyColorEditor from "./Editors/hot-key-color-editor";
import HotKeyLineWidthEditor from "./Editors/hot-key-line-width-editor";
import {logger} from "../../../Common/debug";

interface HotKeyCategoryEditorSelectorProps {
    category: HotKeyCategory
}

const HotKeyCategoryEditorSelector: React.FC<HotKeyCategoryEditorSelectorProps> = (props) => {
    logger.render("HotKeyCategoryEditorSelector");

    switch (props.category.key) {
        case SupportedHotKeyCategories.FillColor:
        case SupportedHotKeyCategories.LineColor:
            return <HotKeyColorEditor category={props.category}/>
        case SupportedHotKeyCategories.LineWidth:
            return <HotKeyLineWidthEditor category={props.category}/>
    }

    return <>
    </>;
}

export default HotKeyCategoryEditorSelector;
