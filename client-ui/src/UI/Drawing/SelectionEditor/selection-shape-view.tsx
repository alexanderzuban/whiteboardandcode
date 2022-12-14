import React, {useEffect, useMemo, useState} from "react";
import {DrawingDocument} from "../../../Drawing/Store/drawing-document";
import styled, {useTheme} from "styled-components";
import {rectHeight, rectWidth} from "../../../Common/point";
import {logger} from "../../../Common/debug";
import SelectionResizeBulletView from "./selection-resize-bullet-view";

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
  border: ${props => props.theme.ui.selectionColor} 2px dashed;
  touch-action: none;
  pointer-events: none;
  z-index: 800;
`;

const SelectionShapeViewInitialState =    {
    hasSelection: false,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
} as SelectionShapeViewState

const SelectionShapeView: React.FC<SelectionShapeViewProps> = (props) => {
    logger.render("SelectionShapeView");

    const theme = useTheme()
    const topPanelSize = theme.navigationPanel.size + theme.navigationPanel.borderWidth


    const [state, setState] = useState(SelectionShapeViewInitialState)

    useEffect(() => {
        const stateUpdate = Object.assign({}, SelectionShapeViewInitialState)
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
        topPanelSize ])

    if (!state.hasSelection) return <></>
    const top = state.top-16
    const left = state.left-16
    const bottom = top+state.height+16
    const right = left+state.width+16

    return <>

        <SelectionDiv
            style={{
                width: `${state.width + 32}px`,
                height: `${state.height + 32}px`,
                top: `${state.top - 16}px`,
                left: `${state.left - 16}px`,
            }}
        />
        <SelectionResizeBulletView top={top} left={left}/>
        <SelectionResizeBulletView top={top} left={right}/>
        <SelectionResizeBulletView top={bottom} left={left}/>
        <SelectionResizeBulletView top={bottom} left={right}/>


    </>
}

export default SelectionShapeView;
