import {Nullable} from "../../Common/generics";
import {DrawingSettings} from "./drawing-settings.store";
import {DrawingProfile} from "../Profile/profile";

class DrawingSettingsInDispatch {
    activeProfile(settings: DrawingSettings): Nullable<DrawingProfile> {
        if (!settings.activeProfile || !settings.drawingProfiles)
            return

        return settings.drawingProfiles.find(p => p.uid === settings.activeProfile)
    }
}


const inDispatchDrawingSettings = new DrawingSettingsInDispatch();
export default inDispatchDrawingSettings;
