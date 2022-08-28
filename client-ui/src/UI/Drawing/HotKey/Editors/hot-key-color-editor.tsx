import React from "react";
import {HotKeyCategory, sliceActionsAppHotKeys} from "../hotkeys.store";

import {useDispatch} from "react-redux";
import {RgbaStringColorPicker} from "react-colorful";
import {logger} from "../../../../Common/debug";

interface HotKeyColorEditorProps {
    category: HotKeyCategory
}

const HotKeyColorEditor: React.FC<HotKeyColorEditorProps> = (props) => {

    const dispatch = useDispatch();

    const currentValue = (props.category.selectedIndex !== undefined) ? props.category.actions[props.category.selectedIndex] : undefined;

    logger.render("HotKeyColorEditor", currentValue, props.category.selectedIndex, props.category.actions);


    function onColorChanged(color: string) {
        if (color !== currentValue) {
            dispatch(sliceActionsAppHotKeys.registerHotKeyAction({
                category: props.category.key,
                action: color,
                index: props.category.selectedIndex
            }));
        }
    }

    return <RgbaStringColorPicker color={currentValue} onChange={onColorChanged}/>;
}
export default HotKeyColorEditor;
