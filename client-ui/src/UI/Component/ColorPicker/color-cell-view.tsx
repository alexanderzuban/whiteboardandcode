import React from "react";
import {logger} from "../../../Common/debug";
import {Nullable} from "../../../Common/generics";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ColorNero, ColorTransparentWhite, ColorWhite} from "../../../Common/css-colors";
import {useTheme} from "styled-components";
import ButtonDiv from "../Button/button-div";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface ColorCellViewProps {
    color: Nullable<string>,
    selected: Nullable<string>,
    onColorSelected: Nullable<(color: string) => void>
}

const ColorCellView: React.FC<ColorCellViewProps> = (props) => {
    logger.render("ColorCellView");
    const theme = useTheme()

    let color = props.color ?? ColorWhite;
    let icon = ['fas', 'circle'] as IconProp
    if (props.color === '-') {
        color = "transparent"
    }

    if (props.color === "") {
        icon = ['fal', 'circle-xmark'] as IconProp
    }

    if (props.color === ColorWhite || props.color === ColorTransparentWhite) {
        icon = ['fat', 'circle'] as IconProp
        color = ColorNero
    }


    const clickHandler = () => {
        if (props.color === '-') {
            return;
        }
        if (props.onColorSelected) {
            props.onColorSelected(props.color ?? "");
        }
    }

    const background = props.color === props.selected ? theme.toolsPanel.focusedBackgroundColor : "transparent";

    return <ButtonDiv
        width={theme.toolsPanel.size}
        height={theme.toolsPanel.size}
        backgroundColor={background}
        onClick={clickHandler}
        border={"none"}
        focusedBackgroundColor={props.color === "-" ? "transparent" : theme.toolsPanel.focusedBackgroundColor}>

        <FontAwesomeIcon
            icon={icon}
            color={color}
            fontSize={theme.toolsPanel.iconSize - 2}/>

    </ButtonDiv>


}

export default ColorCellView;
