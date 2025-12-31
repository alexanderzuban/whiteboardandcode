import React from "react";
import {logger} from "../../../Common/debug";
import {useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import {useTheme} from "styled-components";
import {ColorTransparentWhite, ColorWhite, ColorWhiteSmoke} from "../../../Common/css-colors";
import {fromNullable} from "../../../Common/generics";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DrawingProfileType} from "../../../Drawing/Profile/profile";
import ShapeIconPainterView from "./shape-icon-painter-view";
import {ProfilePlaceholderViewProps} from "./profile-placeholder-view-props";

const ProfilePlaceholderIconView: React.FC<ProfilePlaceholderViewProps> = (props) => {
    logger.render("ProfilePlaceholderIconView")
    const profiles = useSelector((state: AppState) => state.drawingSettings.drawingProfiles)


    const profile = profiles.find(p => p.uid === props.profile)
    const theme = useTheme()

    if (!profile) {
        return <></>
    }

    let color = profile?.settings?.style?.lineColor ?? theme.toolsPanel.mainColor;
    if (color === ColorWhite || color === ColorTransparentWhite) {
        color = ColorWhiteSmoke
    }

    const icon = fromNullable(profile?.icon, profileIcon => {
            return <FontAwesomeIcon
                icon={profileIcon}
                color={color}
                fontSize={theme.toolsPanel.iconSize}/>
        }, () => {
            if (profile.type === DrawingProfileType.Shape && profile.settings && profile.settings.style) {
                return <ShapeIconPainterView
                    shape={profile.settings.shape}
                    style={profile.settings.style}/>
            }
            return <></>
        }
    )


    return <>{icon}</>
}

export default ProfilePlaceholderIconView;
