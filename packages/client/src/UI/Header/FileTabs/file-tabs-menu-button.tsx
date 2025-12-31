import React, {useState} from "react";
import {logger} from "../../../Common/debug";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ButtonDiv from "../../Component/Button/button-div";
import {Dropdown, Tooltip} from "antd";
import {useFileMenu} from "./useFileMenu";

const FileTabsMenuButton: React.FC = (props) => {
    logger.render("FileTabsMenuButton");
    const [isTooltipVisible, setTooltipVisible] = useState(false)
    const menu = useFileMenu()

    const dropdownVisibilityChangeHandler = (open: boolean) => {
        if (open) {
            setTooltipVisible(false)
        }
    }

    return <Tooltip
        placement={"bottom"}
        title={"Selected File Options"}
        open={isTooltipVisible}>
        <Dropdown
            overlay={menu}
            trigger={['click']}
            onOpenChange={dropdownVisibilityChangeHandler}>
            <ButtonDiv>
                <FontAwesomeIcon icon={['fal', 'ellipsis-v']} fontSize={16}/>
            </ButtonDiv>
        </Dropdown>
    </Tooltip>
}

export default FileTabsMenuButton;
