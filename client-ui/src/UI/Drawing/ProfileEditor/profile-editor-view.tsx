import React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import {logger} from "../../../Common/debug";
import {Nullable} from "../../../Common/generics";
import ColorPickerView, {DefaultPalette} from "../../Component/ColorPicker/color-picker-view";


interface ProfileEditorViewProps {
    profile: Nullable<string>
}

const ProfileEditorView: React.FC<ProfileEditorViewProps> = (props) => {
    logger.render("ProfileEditorView");
    const profiles = useSelector((state: AppState) => state.drawingSettings.drawingProfiles)
    const profile = profiles.find(p => p.uid === props.profile)

    if (!profile)
        return <></>

    return <>

        <ColorPickerView palette={DefaultPalette} selected={profile?.settings?.style?.lineColor}/>

    </>


}

export default ProfileEditorView;
