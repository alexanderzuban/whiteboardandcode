import React from "react";
import {logger} from "../../../Common/debug";
import ProfileEditorViewProps from "./profile-editor-view-props";
import ProfileLineColorEditorView from "./profile-line-color-editor-view";
import ProfileLineWidthEditorView from "./profile-line-width-editor-view";


const ProfileEditorView: React.FC<ProfileEditorViewProps> = (props) => {
    logger.render("ProfileEditorView");

    return <>
        <ProfileLineWidthEditorView
            profile={props.profile}/>
        
        <ProfileLineColorEditorView
            profile={props.profile}/>
    </>


}

export default ProfileEditorView;
