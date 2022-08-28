import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import HotKeyButton from "./hot-key-button";
import {logger} from "../../../Common/debug";


const LeftPanelViewContent = styled.div`
  padding: 10px;
  border-width: ${props => props.theme.navigationPanel.borderWidth}px;
  border-color: ${props => props.theme.navigationPanel.borderColor};
  border-style: solid;

  background: ${props => props.theme.navigationPanel.backgroundColor};
  border-radius: ${props => props.theme.navigationPanel.borderRadius}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  position: fixed;
  top: 100px;
  width: 50px;
  left: 5px;
  z-index: 1000;
`;


const HotKeyPanel: React.FC = () => {
    logger.render("HotKeyPanel");
    const hotKeys = useSelector((state: AppState) => state.appHotKeys.categories);


    return <LeftPanelViewContent>
        {
            hotKeys.map((category, index) => {
                return <HotKeyButton category={category.key} key={category.key}/>
            })
        }
    </LeftPanelViewContent>;
}

export default HotKeyPanel;
