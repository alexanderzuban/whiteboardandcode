import React from "react";
import {logger} from "../../../Common/debug";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import ButtonDiv from "../../Component/Button/button-div";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Tooltip} from "antd";
import {useTheme} from "styled-components";
import {ColorWhite} from "../../../Common/css-colors";
import {sliceActionsAppHotKeys} from "../HotKey/hotkeys.store";

interface ProfilePlaceholderViewProps {
    profile: String
}

const ProfilePlaceholderView: React.FC<ProfilePlaceholderViewProps> = (props) => {
    logger.render("ProfilePlaceholderView")
    const profiles = useSelector((state: AppState) => state.drawingSettings.drawingProfiles)
    const activeProfile = useSelector((state: AppState) => state.drawingSettings.activeProfile)
    const dispatch = useDispatch()

    const profile = profiles.find(p => p.uid === props.profile)
    const theme = useTheme()

    if (!profile) {
        return <></>
    }

    const background = (profile.uid === activeProfile)
        ? theme.toolsPanel.focusedBackgroundColor
        : ColorWhite;

    const clickHandler = () => {
        dispatch(sliceActionsAppHotKeys.toggleHotKeyProfile(profile.uid));
    }

    return <Tooltip placement={"left"} title={profile.description} mouseEnterDelay={1}>
        <ButtonDiv
            width={theme.toolsPanel.size}
            height={theme.toolsPanel.size}
            backgroundColor={background}
            onClick={clickHandler}
            border={"none"}
            focusedBackgroundColor={theme.toolsPanel.focusedBackgroundColor}>
            <FontAwesomeIcon
                icon={profile?.icon ?? ['fal', 'question']}
                color={profile.settings?.style?.lineColor ?? theme.toolsPanel.mainColor}
                fontSize={theme.toolsPanel.iconSize}/>
        </ButtonDiv>
    </Tooltip>

}

export default ProfilePlaceholderView;
