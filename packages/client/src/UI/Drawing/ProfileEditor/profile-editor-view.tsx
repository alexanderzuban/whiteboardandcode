import React from "react";
import {logger} from "../../../Common/debug";
import ProfileEditorViewProps from "./profile-editor-view-props";
import ProfileLineColorEditorView from "./profile-line-color-editor-view";
import ProfileLineWidthEditorView from "./profile-line-width-editor-view";
import {Divider} from "antd";
import ProfileFillColorEditorView from "./profile-fill-color-editor-view";


const ProfileEditorView: React.FC<ProfileEditorViewProps> = (props) => {
    logger.render("ProfileEditorView");

    return <>
        <Divider/>

        <ProfileLineWidthEditorView
            profile={props.profile}/>

        <ProfileLineColorEditorView
            profile={props.profile}/>

        <ProfileFillColorEditorView
            profile={props.profile}/>

    </>


}

export default ProfileEditorView;
