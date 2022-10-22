import React, {useState} from "react";
import {sliceActionsAppHotKeys, SupportedHotKeyCategories} from "./hotkeys.store";
import {Popover, Tooltip} from "antd";
import styled, {useTheme} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import ButtonDiv from "../../Component/Button/button-div";
import {logger} from "../../../Common/debug";
import CategoryEditorView from "../CategoryEditor/category-editor-view";

interface HotKeyButtonProps {
    category: SupportedHotKeyCategories
}

const TitleTemplate = styled.div`
  font-size: 12pt;
  font-weight: bold;
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
    const activeCategory = useSelector((state: AppState) => state.appHotKeys.activeCategory);
    const theme = useTheme();
    const dispatch = useDispatch();

    const category = hotKeys.find(c => c.key === props.category);
    if (!category) {
        return <></>
    }

    const hide = () => {
        setDisplayConfig(false);
    };

    const onDisplayConfigChanged = (newValue: boolean) => {
        setDisplayConfig(newValue);
    }

    const closeIcon = <>
        <IconTemplate
            fontSize={24} icon={["fal", "window-close"]} onClick={hide}/>
    </>;

    const title = <>
        <TitleTemplate>{category.name} Profiles {closeIcon}</TitleTemplate>
    </>;

    const background = (category.key === activeCategory)
        ? theme.toolsPanel.focusedBackgroundColor
        : theme.toolsPanel.backgroundColor;

    const clickHandler = () => {
        dispatch(sliceActionsAppHotKeys.toggleHotKeyCategory(category.key))
    }


    const tooltip =
        <Tooltip placement={"left"} title={category.tooltip} mouseEnterDelay={2}>
            <ButtonDiv
                width={theme.toolsPanel.size}
                height={theme.toolsPanel.size}
                backgroundColor={background}
                onClick={clickHandler}
                border={"none"}
                focusedBackgroundColor={theme.toolsPanel.focusedBackgroundColor}>
                <FontAwesomeIcon
                    icon={category?.icon ?? ['fal', 'question']}
                    color={theme.toolsPanel.mainColor}
                    fontSize={theme.toolsPanel.iconSize}/>
            </ButtonDiv>
        </Tooltip>

    if (category.profiles?.length === 0) {
        return tooltip
    }

    return <Popover
        trigger="click"
        placement="rightTop"
        content={<CategoryEditorView category={props.category}/>}
        title={title}
        visible={isDisplayConfig}
        onVisibleChange={onDisplayConfigChanged}>
        {tooltip}
    </Popover>;
}
export default HotKeyButton;
