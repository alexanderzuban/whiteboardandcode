import {DrawingDocument} from "../../../Drawing/Store/drawing-document";
import styled, {useTheme} from "styled-components";
import React, {useEffect, useState} from "react";
import {logger} from "../../../Common/debug";
import {rectHeight, rectWidth} from "../../../Common/point";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface SelectionResizeBulletViewProps {
    left:number,
    top:number
}

interface SelectionResizeBulletViewState {

}



const BULLET_SIZE = 16;
const BULLET_OFFSET = BULLET_SIZE / 2;

const SelectionResizeBulletView: React.FC<SelectionResizeBulletViewProps> = (props) => {
    logger.render("SelectionResizeBulletView");

    const theme = useTheme()

    // Center the bullet on the given coordinates by offsetting by half its size
    return <div style={{
                position:"fixed",
                margin:0,
                padding:0,
                top: `${props.top - BULLET_OFFSET}px`,
                left: `${props.left - BULLET_OFFSET}px`,
                color: theme.ui.selectionColor,
                pointerEvents: "none",
            }}>
        <FontAwesomeIcon
            icon={['fas','circle']}
            fontSize={BULLET_SIZE}
        />
    </div>
}

export default SelectionResizeBulletView;
