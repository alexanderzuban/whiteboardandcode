import React, {useEffect, useState} from "react";
import {DrawingDocument} from "../../../Drawing/Store/drawing-document";
import styled, {useTheme} from "styled-components";
import {rectHeight, rectWidth} from "../../../Common/point";
import {logger} from "../../../Common/debug";

interface SelectionShapeViewProps {
    document: DrawingDocument
}

interface SelectionShapeViewState {
    hasSelection: boolean
    width: number
    height: number
    top: number
    left: number
}

interface SelectionWrapperProps {

}

const SelectionDiv = styled.div<SelectionWrapperProps>`
  position: fixed;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
  border: black 2px solid;
  display: block;
  touch-action: none;
  z-index: 800;
`;


const SelectionShapeView: React.FC<SelectionShapeViewProps> = (props) => {
    logger.render("SelectionShapeView");

    const theme = useTheme()
    const topPanelSize = theme.navigationPanel.size + theme.navigationPanel.borderWidth


    const [state, setState] = useState(
        {
            hasSelection: false,
            width: 0,
            height: 0,
            top: 0,
            left: 0,
        } as SelectionShapeViewState)

    useEffect(() => {
        const stateUpdate = Object.assign({}, state)
        if (props.document.selectedShapes.keys.length === 0) {
            stateUpdate.hasSelection = false
        } else {
            stateUpdate.hasSelection = true
            const selection = props.document.selectedShapes

            if (selection.boundingRect) {
                stateUpdate.width = rectWidth(selection.boundingRect)
                stateUpdate.height = rectHeight(selection.boundingRect)
                stateUpdate.top = selection.boundingRect.topLeft.y - props.document.origin.y + topPanelSize
                stateUpdate.left = selection.boundingRect.topLeft.x - props.document.origin.x
            }
        }

        setState(stateUpdate)
    }, [
        props.document.origin,
        props.document,
        props.document.selectedShapes.keys,
        props.document.selectedShapes.boundingRect,
        topPanelSize])

    if (!state.hasSelection) return <></>


    return <SelectionDiv

        style={{
            width: `${state.width + 16}px`,
            height: `${state.height + 16}px`,
            top: `${state.top - 8}px`,
            left: `${state.left - 8}px`,
        }}
    />
}

export default SelectionShapeView;
