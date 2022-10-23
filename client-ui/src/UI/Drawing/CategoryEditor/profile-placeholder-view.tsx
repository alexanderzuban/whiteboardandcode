import React from "react";
import {logger} from "../../../Common/debug";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import ButtonDiv from "../../Component/Button/button-div";
import {Tooltip} from "antd";
import {useTheme} from "styled-components";
import {ColorWhite} from "../../../Common/css-colors";
import {sliceActionsAppHotKeys} from "../HotKey/hotkeys.store";
import ProfilePlaceholderIconView from "./profile-placeholder-icon-view";
import {ProfilePlaceholderViewProps} from "./profile-placeholder-view-props";


const ProfilePlaceholderView: React.FC<ProfilePlaceholderViewProps> = (props) => {
    logger.render("ProfilePlaceholderView")
    const profiles = useSelector((state: AppState) => state.drawingSettings.drawingProfiles)
    const activeProfile = useSelector((state: AppState) => state.drawingSettings.activeProfile)
    const dispatch = useDispatch()

    const profile = profiles.find(p => p.uid === props.profile)
    const theme = useTheme()
    logger.debug("ProfilePlaceholderView", profile)
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
            <ProfilePlaceholderIconView profile={props.profile}/>
        </ButtonDiv>
    </Tooltip>

}

export default ProfilePlaceholderView;
