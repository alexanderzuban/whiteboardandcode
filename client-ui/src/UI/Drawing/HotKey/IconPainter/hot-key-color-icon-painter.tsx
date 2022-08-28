import React from "react";
import styled, {DefaultTheme, useTheme} from "styled-components";
import HotKeyCellPainter from "./hot-key-cell-painter";
import {HotKeyIconPainterProps} from "./hot-key-icon-painter-props";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {logger} from "../../../../Common/debug";

interface ColoredDivProperties {
    selectedColor: string;
    theme: DefaultTheme;
}

const ColoredDiv = styled.div<ColoredDivProperties>`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  border: none;
  background-color: ${props => props.selectedColor}
`


const HotKeyColorIconPainter: React.FC<HotKeyIconPainterProps> = (props) => {
    logger.render("HotKeyColorIconPainter", props.action);
    const theme = useTheme();

    if (props.iconOnly) {
        return <FontAwesomeIcon
            icon={props.category.icon}
            color={props.action}
            fontSize={theme.navigationPanel.iconSize}/>
    }

    return <HotKeyCellPainter
        category={props.category} action={props.action} index={props.index} iconOnly={props.iconOnly}>
        <ColoredDiv selectedColor={props.action}/>
    </HotKeyCellPainter>;

}
export default HotKeyColorIconPainter;
