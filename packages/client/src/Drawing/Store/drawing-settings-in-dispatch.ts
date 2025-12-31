import {Nullable} from "../../Common/generics";
import {DrawingSettings} from "./drawing-settings.store";
import {DrawingProfile} from "../Profile/profile";
import {DrawingShapeStyle, DrawingShapeStyleFeature} from "../Shape/shapes";

class DrawingSettingsInDispatch {
    activeProfile(settings: DrawingSettings): Nullable<DrawingProfile> {
        if (!settings.activeProfile || !settings.drawingProfiles)
            return

        return settings.drawingProfiles.find(p => p.uid === settings.activeProfile)
    }

    updateShapeStyle(style: Nullable<DrawingShapeStyle>, change: { feature: DrawingShapeStyleFeature, value: string }) {
        if (!style) return
        switch (change.feature) {
            case DrawingShapeStyleFeature.LineColor:
                style.lineColor = change.value
                break
            case DrawingShapeStyleFeature.LineWidth:
                style.lineWidth = Number(change.value)
                break
            case DrawingShapeStyleFeature.FillStyle:
                style.fillStyle = change.value
                break
            case DrawingShapeStyleFeature.FillColor:
                style.fillColor = change.value
                break
            case DrawingShapeStyleFeature.LineType:
                style.lineType = change.value
                break
            case DrawingShapeStyleFeature.LineStart:
                style.lineStart = change.value
                break
            case DrawingShapeStyleFeature.LineEnd:
                style.lineEnd = change.value
                break
            case DrawingShapeStyleFeature.EraserStyle:
            case DrawingShapeStyleFeature.EraserWidth:
                break
        }
    }

    changeProfileStyle(settings: DrawingSettings, change: { uid: string, feature: DrawingShapeStyleFeature, value: string }) {
        const profile = settings.drawingProfiles.find(p => p.uid === change.uid)
        if (!profile) return;
        this.updateShapeStyle(profile.settings?.style, change)
    }
}


const inDispatchDrawingSettings = new DrawingSettingsInDispatch();
export default inDispatchDrawingSettings;
