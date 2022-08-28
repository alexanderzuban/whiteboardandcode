import React, {ReactNode} from "react";
import {HotKeyIconPainterProps} from "./hot-key-icon-painter-props";
import HotKeyCellPainter from "./hot-key-cell-painter";
import {SupportedOperations} from "../../../../Drawing/Operation/operations";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled, {DefaultTheme, useTheme} from "styled-components";
import {logger} from "../../../../Common/debug";

const operations: { operation: SupportedOperations, icon: IconProp, info: string }[] = [
    {
        operation: SupportedOperations.NewShape,
        icon: ['fal', 'circle-plus'],
        info: "Create new shapes. Alternative:  use [ALT] + [Mouse] to create active shape"
    },
    {
        operation: SupportedOperations.Select,
        icon: ['fal', 'arrow-pointer'],
        info: "Select shapes. Alternative: use [SHIFT]+{Mouse} to extend selection"
    },
    {
        operation: SupportedOperations.Pan,
        icon: ['fal', 'hand'],
        info: "Pan viewport. Alternative: use [CTRL]+{Mouse} to move"
    },
    {
        operation: SupportedOperations.Translate,
        icon: ['fal', 'arrows-up-down-left-right'],
        info: "Move selected shapes.Alternative: use [CTRL]+{Mouse} when there are selected shapes"
    },
    {
        operation: SupportedOperations.Scale,
        icon: ['fal', 'magnifying-glass'],
        info: ""
    },
    {
        operation: SupportedOperations.Erase,
        icon: ['fal', 'eraser'],
        info: "Erase shapes. Alternative: use [DEL] to erase selected shapes"
    },
];

interface ContainerDivProperties {
    children?: ReactNode;
    theme: DefaultTheme;
}

const ContainerDiv = styled.div<ContainerDivProperties>`
  margin: 0;
  padding: 1px;
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  justify-content: center;

`

const HotKeyOperationIconPainter: React.FC<HotKeyIconPainterProps> = (props) => {
    logger.render("HotKeyOperationIconPainter");

    const theme = useTheme();
    const operation = parseInt(props.action) as SupportedOperations;
    const info = operations.find(i => i.operation === operation)

    return <HotKeyCellPainter
        category={props.category}
        action={props.action}
        index={props.index}
        tooltip={`Hot Key [${props.index}]. ${info?.info}`}
        iconOnly={props.iconOnly}>
        <ContainerDiv>
            <FontAwesomeIcon
                icon={info?.icon ?? ['fal', 'question']}
                color={theme.navigationPanel.mainColor}
                fontSize={theme.navigationPanel.iconSize}/>
        </ContainerDiv>
    </HotKeyCellPainter>;
}
export default HotKeyOperationIconPainter;
