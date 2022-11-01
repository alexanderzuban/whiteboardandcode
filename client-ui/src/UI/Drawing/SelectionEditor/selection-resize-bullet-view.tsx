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



const SelectionResizeBulletView: React.FC<SelectionResizeBulletViewProps> = (props) => {
    logger.render("SelectionResizeBulletView");

    const theme = useTheme()



    return <div style={{
                position:"fixed",
                margin:0,
                padding:0,
                top: `${props.top}px`,
                left: `${props.left}px`,
            }}>
        <FontAwesomeIcon
            icon={['fas','circle']}
            fontSize={16}

        />
    </div>
}

export default SelectionResizeBulletView;
