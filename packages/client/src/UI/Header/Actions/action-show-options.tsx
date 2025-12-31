import React, {useMemo} from "react";
import {Tooltip} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ButtonDiv from "../../Component/Button/button-div";
import {logger} from "../../../Common/debug";

const ActionShowOptions: React.FC = (props) => {
    logger.render("ActionShowOptions");

    const icon = useMemo(() => <FontAwesomeIcon
        icon={['fal', 'bars']}
        fontSize={16}/>, [])

    return <Tooltip placement={"rightBottom"} title={"Display more options"} mouseEnterDelay={2}>
        <ButtonDiv>
            {icon}
        </ButtonDiv>
    </Tooltip>;
}

export default ActionShowOptions;
