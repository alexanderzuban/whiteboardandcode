import {DefaultDrawingProfileBehaviour, DrawingProfile} from "./profile";
import {DrawingShapeStyleFeature} from "../Shape/shapes";

export class FreehandProfileBehavior extends DefaultDrawingProfileBehaviour {
    constructor() {
        super();
        this.Features.delete(DrawingShapeStyleFeature.FillColor);
        this.Features.delete(DrawingShapeStyleFeature.FillStyle);
    }

    hasNoColor(profile: DrawingProfile, feature: DrawingShapeStyleFeature): boolean {
        return false
    }
}
