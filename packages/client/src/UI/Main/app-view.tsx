import React from "react";
import AppViewListener from "./app-view-listener";
import styled from "styled-components";

import CenterPanelView from "../Layout/CenterPanel/center-panel-view";
import TopPanelView from "../Layout/TopPanel/top-panel-view";
import {logger} from "../../Common/debug";
import ContentView from "../Content/content-view";

const ViewportWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const AppView: React.FC = () => {
    logger.render("AppView");

    return <ViewportWrapper>
        <AppViewListener/>

        <TopPanelView/>


        <CenterPanelView>
            <ContentView/>
        </CenterPanelView>

    </ViewportWrapper>;
}

export default AppView;
