import React, {MouseEvent} from "react";
import {logger} from "../../../Common/debug";
import {ContentDocument} from "../../Content/Store/content.store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useTheme} from "styled-components";
import {Col, Dropdown, Row} from "antd";
import {useFileMenu} from "./useFileMenu";

interface FileTabPaneViewProps {
    file: ContentDocument
}

const FileTabPaneView: React.FC<FileTabPaneViewProps> = (props) => {
    logger.render("FileTabPaneView");
    const theme = useTheme()
    const menu = useFileMenu(props.file)

    const contextMenuHandler = (event: MouseEvent<HTMLDivElement>) => {
        event.nativeEvent.preventDefault();
    }


    return <Dropdown overlay={menu} trigger={['contextMenu']}>
        <Row gutter={[3, 1]} wrap={false} onContextMenu={contextMenuHandler}>
            <Col>
                <div style={{display: "flex", alignItems: "center", height: "100%"}}>
                    <FontAwesomeIcon
                        style={{margin: 0, padding: 0, display: "block"}}
                        color={props.file.unsaved ? theme.ui.unsavedFileColor : theme.ui.savedFileColor}
                        fontSize={5} icon={["fas", "circle"]}/>
                </div>
            </Col>
            <Col>
                <span style={{padding: 0, margin: 0}}>{props.file.name}</span>
            </Col>
        </Row>
    </Dropdown>


}

export default FileTabPaneView;
