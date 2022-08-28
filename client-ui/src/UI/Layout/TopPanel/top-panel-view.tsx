import {useTheme} from "styled-components";
import Panel from "../../Component/Panel/panel";
import React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store"
import ViewProps from "../../Component/view-props";
import {Avatar, Col, Row} from "antd";
import ActionsView from "../../Header/Actions/actions-view";
import FileTabsView from "../../Header/FileTabs/file-tabs-view";
import {UserOutlined} from '@ant-design/icons';
import {logger} from "../../../Common/debug";


const TopPanelView: React.FC<ViewProps> = (props) => {
    logger.render("TopPanelView");
    const size = useSelector((state: AppState) => state.appView.size)
    const theme = useTheme()

    return <Panel
        height={theme.navigationPanel.size}
        width={size.width}
        backgroundColor={theme.navigationPanel.backgroundColor}
        borderBottom={`${theme.navigationPanel.borderColor} solid ${theme.navigationPanel.borderWidth}px`}
        left={0}
        top={0}>
        <Row gutter={[2, 2]} wrap={false}>
            <Col>
                <ActionsView/>
            </Col>
            <Col flex="auto">
                <FileTabsView/>
            </Col>

            <Col>
                <Avatar shape="square" size="large" icon={<UserOutlined/>}/>
            </Col>
        </Row>;
    </Panel>;
}

export default TopPanelView;
