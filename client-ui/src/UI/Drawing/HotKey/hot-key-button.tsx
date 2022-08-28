import React, {useState} from "react";
import {SupportedHotKeyCategories} from "./hotkeys.store";
import {Popover, Tooltip} from "antd";
import HotKeyConfigurePanel from "./hot-key-configure-panel";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import HotKeyCategoryActionIconSelector from "./hot-key-category-action-icon-selector";
import {useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import ButtonDiv from "../../Component/Button/button-div";
import {logger} from "../../../Common/debug";

interface HotKeyButtonProps {
    category: SupportedHotKeyCategories
}

const TitleTemplate = styled.div`
  font-size: 12pt;
  width: 100%;
  user-select: none;
`

const IconTemplate = styled(FontAwesomeIcon)`
  float: right;
`


const HotKeyButton: React.FC<HotKeyButtonProps> = (props) => {
    logger.render("HotKeyButton");

    const [isDisplayConfig, setDisplayConfig] = useState(false)
    const hotKeys = useSelector((state: AppState) => state.appHotKeys.categories);

    const category = hotKeys.find(c => c.key === props.category);


    if (!category) {
        return <></>
    }

    const index = category.selectedIndex !== undefined ? category.selectedIndex : 1;
    const actionToDisplay = category.actions[index];


    const hide = () => {
        setDisplayConfig(false);
    };

    const onDisplayConfigChanged = (newValue: boolean) => {
        setDisplayConfig(newValue);
    }


    const content = <HotKeyConfigurePanel category={category}/>;
    const closeIcon = <IconTemplate
        fontSize={16} icon={["fal", "window-close"]} onClick={hide}/>;

    const title = <TitleTemplate>{category.name} Hot Keys {closeIcon}<br/>Press '{category.key}' +
        [HotKey]</TitleTemplate>;

    return <Popover
        trigger="click"
        placement="rightTop"
        content={content}
        title={title}
        visible={isDisplayConfig}
        onVisibleChange={onDisplayConfigChanged}>
        <Tooltip placement={"left"} title={category.tooltip} mouseEnterDelay={1}>
            <ButtonDiv>
                <HotKeyCategoryActionIconSelector
                    category={category}
                    action={actionToDisplay}
                    index={index}
                    shapeProfile={true}
                />
            </ButtonDiv>
        </Tooltip>
    </Popover>;
}
export default HotKeyButton;
