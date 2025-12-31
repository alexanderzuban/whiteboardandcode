import React from "react";
import {logger} from "../../../Common/debug";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import getProfileBehavior from "../../../Drawing/Profile/profile-behaviour";
import ProfileEditorViewProps from "./profile-editor-view-props";
import {DrawingShapeStyleFeature} from "../../../Drawing/Shape/shapes";
import {sliceActionsDrawingSettings} from "../../../Drawing/Store/drawing-settings.store";
import LineWidthPickerView from "../../Component/LineWidthPicker/line-width-picker-view";


const ProfileLineWidthEditorView: React.FC<ProfileEditorViewProps> = (props) => {
    logger.render("ProfileLineWidthEditorView");
    const profiles = useSelector((state: AppState) => state.drawingSettings.drawingProfiles)
    const profile = profiles.find(p => p.uid === props.profile)
    const dispatch = useDispatch();

    if (!profile)
        return <></>

    const behaviour = getProfileBehavior(profile);
    if (behaviour?.isSupport(profile, DrawingShapeStyleFeature.LineWidth) !== true) {
        return <></>
    }

    const widthChangeHandler = (width: string) => {
        dispatch(sliceActionsDrawingSettings.drawingProfileUpdateStyle({
            uid: profile.uid,
            feature: DrawingShapeStyleFeature.LineWidth,
            value: width
        }))
    }
    const selected = `${profile?.settings?.style?.lineWidth ?? ""}`

    return <>

        <LineWidthPickerView
            sizes={behaviour.sizes(profile, DrawingShapeStyleFeature.LineWidth)}
            title="Thickness"
            onWidthSelected={widthChangeHandler}
            selected={selected}/>

    </>


}

export default ProfileLineWidthEditorView;
