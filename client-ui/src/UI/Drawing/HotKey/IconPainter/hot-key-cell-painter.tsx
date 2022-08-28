import styled, {DefaultTheme} from "styled-components";
import {sliceActionsAppHotKeys} from "../hotkeys.store";
import React from "react";
import {useDispatch} from "react-redux";
import {Tooltip} from "antd";
import {HotKeyIconPainterProps} from "./hot-key-icon-painter-props";
import {logger} from "../../../../Common/debug";


interface CellDivProperties {
    isSelected?: boolean;
    theme: DefaultTheme;
}

const Div = styled.div<CellDivProperties>`
  width: ${props => props.theme.navigationPanel.size}px;
  height: ${props => props.theme.navigationPanel.size}px;
  margin: 0;
  padding: 0;
  display: flex;
  border: ${props => props.isSelected ? `3px solid ${props.theme.ui.selectionColor}` : "1px solid gray"};
`


const HotKeyCellPainter: React.FC<HotKeyIconPainterProps> = (props) => {
    logger.render("HotKeyCellPainter", props.action);
    let tooltip = props.tooltip
    if (!tooltip) {
        tooltip = <><span>Hot Key [{props.index}]</span><br/><span>Click to change</span></>
    }


    const dispatch = useDispatch();

    function notifyClick() {
        dispatch(sliceActionsAppHotKeys.selectActionForEdit({category: props.category.key, index: props.index}))
        dispatch(sliceActionsAppHotKeys.toggleHotKeyCategory(props.category.key))
        dispatch(sliceActionsAppHotKeys.toggleHotKey(`${props.index}`))
    }

    if (props.iconOnly) {
        return <>{props.children}</>
    }

    return <Tooltip placement={"top"} title={tooltip} mouseEnterDelay={1}>
        <Div
            isSelected={props.category.selectedIndex === props.index}
            onClick={notifyClick}>
            {props.children}
        </Div>
    </Tooltip>;

}
export default HotKeyCellPainter;
