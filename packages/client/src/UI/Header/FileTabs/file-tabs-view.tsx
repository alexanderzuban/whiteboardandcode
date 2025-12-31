import React, {MouseEvent} from "react";
import {Tabs} from "antd";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import store, {AppState} from "../../../Store/App.store";
import {sliceActionsContent} from "../../Content/Store/content.store";
import {logger} from "../../../Common/debug";
import FileTabPaneView from "./file-tab-pane";
import FileTabCloseView from "./file-tab-close";
import FileTabsMenuButton from "./file-tabs-menu-button";

const TabsDiv = styled.div`
  background: white;
  padding-left: 20px;
  display: block;
`

const FileTabsView: React.FC = (props) => {
    logger.render("FileTabsView");

    const selected = useSelector((state: AppState) => state.content.selectedUid);
    const totalFiles = useSelector((state: AppState) => state.content.filesCount);

    const dispatch = useDispatch();

    const files = store.getState().content.files


    const onChangeHandler = (key: string) => {
        dispatch(sliceActionsContent.selectFileForEdit(key))
    };

    const onTabClickHandler = (actionKey: string, e: React.KeyboardEvent | React.MouseEvent) => {
        const mouse = e as MouseEvent;
        logger.log("onTabClickHandler", mouse, mouse.detail)

        if (mouse) {
            mouse.nativeEvent.preventDefault();
        }
    };
 
    const items = files.map(file => (
        {
            key: file.uid,
            active: file.uid === selected,
            closable: totalFiles > 1,
            closeIcon: <FileTabCloseView file={file}/>,
            label: <FileTabPaneView file={file}/>
        }
    ))

    return <TabsDiv>
        <Tabs
            hideAdd
            activeKey={selected}
            size={"small"}
            tabBarExtraContent={<FileTabsMenuButton/>}
            onChange={onChangeHandler}
            onTabClick={onTabClickHandler}
            type="editable-card"
            items={items}/>
    </TabsDiv>;
}

export default FileTabsView;
