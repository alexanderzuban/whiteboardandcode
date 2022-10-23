import {DefaultDrawingProfileBehaviour, DrawingProfile} from "./profile";
import {DrawingShapeStyleFeature, getShapeBehavior, SupportedShapes} from "../Shape/shapes";

export class ShapeProfileBehavior extends DefaultDrawingProfileBehaviour {
    constructor() {
        super();

        this.Features.clear();
    }

    isSupport(profile: DrawingProfile, feature: DrawingShapeStyleFeature): boolean {
        if (this.Features.size === 0) {
            const behavior = getShapeBehavior(profile.settings?.shape ?? SupportedShapes.Line);
            return behavior.supportedStyleFeatures().indexOf(feature) >= 0;
        }
        return false;
    }


    hasNoColor(profile: DrawingProfile, feature: DrawingShapeStyleFeature): boolean {
        return true
    }
}
