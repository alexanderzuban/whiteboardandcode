import React, {useMemo} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dropdown, Menu} from "antd";
import ButtonDiv from "../../Component/Button/button-div";
import {useDispatch} from "react-redux";
import {sliceActionsContent} from "../../Content/Store/content.store";
import {logger} from "../../../Common/debug";

const ActionNewFile: React.FC = (props) => {
    logger.render("ActionNewFile");

    const icon = useMemo(() => <FontAwesomeIcon
        icon={['fal', 'file-plus']}
        fontSize={16}/>, [])


    const dispatch = useDispatch();

    const menuClickHandler = (item: { key: string }) => {
        if (item.key === "whiteboard") {
            dispatch(sliceActionsContent.newDrawingDocument())
        }
        if (item.key === "code") {
            dispatch(sliceActionsContent.newTextDocument())
        }
    }

    const menuItems = useMemo(() => [
        {
            label: 'New Whiteboard',
            key: 'whiteboard',
            icon: <FontAwesomeIcon
                icon={['fal', 'chalkboard-user']}
                fontSize={12}/>,
        },
        {
            label: 'New Code',
            key: 'code',
            icon: <FontAwesomeIcon
                icon={['fal', 'code']}
                fontSize={12}/>,
        },
    ], [])

    const menu = <Menu onClick={menuClickHandler} items={menuItems}/>;


    return <Dropdown overlay={menu} placement="bottomLeft" mouseEnterDelay={3} trigger={["click", "hover"]}>
        <ButtonDiv>{icon}</ButtonDiv>
    </Dropdown>;
}

export default ActionNewFile;
