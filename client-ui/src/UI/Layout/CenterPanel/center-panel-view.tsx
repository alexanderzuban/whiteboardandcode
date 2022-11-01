import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import Panel from "../../Component/Panel/panel";
import {useTheme} from "styled-components";
import ViewProps from "../../Component/view-props";
import {logger} from "../../../Common/debug";
import {sliceActionsAppView} from "../../Main/app-view.store";
import {Size} from "../../../Common/size";


const CenterPanelView: React.FC<ViewProps> = (props) => {
    logger.render("CenterPanelView");
    const size = useSelector((state: AppState) => state.appView.size)
    const dispatch = useDispatch()
    const theme = useTheme()

    let topPanelSize = theme.navigationPanel.size + theme.navigationPanel.borderWidth
    let viewportTop = topPanelSize
    let viewportLeft = 0;
    let viewportHeight = size.height - topPanelSize
    let viewportWidth = size.width


    useEffect(() => {
        dispatch(sliceActionsAppView.contentSize(
            {
                width: viewportWidth,
                height: viewportHeight
            } as Size));
    }, [dispatch, viewportHeight, viewportWidth])


    return <Panel
        style={{
            width:`${size.width}px`,
            height:`${viewportHeight}px`,
            left:`${viewportLeft}px`,
            top:`${viewportTop}px`
        }}
        backgroundColor={"white"}>
        {props.children}
    </Panel>;
}

export default CenterPanelView;
