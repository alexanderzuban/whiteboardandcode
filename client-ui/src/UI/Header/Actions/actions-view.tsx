import React from "react";
import ActionNewFile from "./action-new-file";
import ActionShowOptions from "./action-show-options";
import {Col, Row} from "antd";
import {logger} from "../../../Common/debug";

const ActionsView: React.FC = (props) => {
    logger.render("ActionsView");


    return <Row gutter={[2, 2]} wrap={false}>
        <Col>
            <ActionShowOptions/>
        </Col>
        <Col>
            <ActionNewFile/>
        </Col>
    </Row>;
}

export default ActionsView;
