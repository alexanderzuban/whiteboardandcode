import React from "react";
import {logger} from "../../../Common/debug";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import getProfileBehavior from "../../../Drawing/Profile/profile-behaviour";
import ColorPickerView from "../../Component/ColorPicker/color-picker-view";
import ProfileEditorViewProps from "./profile-editor-view-props";
import {DrawingShapeStyleFeature} from "../../../Drawing/Shape/shapes";
import {sliceActionsDrawingSettings} from "../../../Drawing/Store/drawing-settings.store";


const ProfileLineColorEditorView: React.FC<ProfileEditorViewProps> = (props) => {
    logger.render("ProfileLineColorEditorView");
    const profiles = useSelector((state: AppState) => state.drawingSettings.drawingProfiles)
    const profile = profiles.find(p => p.uid === props.profile)
    const dispatch = useDispatch();

    if (!profile)
        return <></>

    const behaviour = getProfileBehavior(profile);
    if (behaviour?.isSupport(profile, DrawingShapeStyleFeature.LineColor) !== true) {
        return <></>
    }

    const colorChangeHandler = (color: string) => {
        dispatch(sliceActionsDrawingSettings.drawingProfileUpdateStyle({
            uid: profile.uid,
            feature: DrawingShapeStyleFeature.LineColor,
            value: color
        }))
    }

    return <>

        <ColorPickerView
            palette={behaviour.palette(profile, DrawingShapeStyleFeature.LineColor)}
            noColor={behaviour.hasNoColor(profile, DrawingShapeStyleFeature.LineColor)}
            title="Line Color"
            onColorSelected={colorChangeHandler}
            selected={profile?.settings?.style?.lineColor}/>

    </>


}

export default ProfileLineColorEditorView;
