import {DefaultDrawingProfileBehaviour, DrawingProfile} from "./profile";
import {DrawingShapeStyleFeature} from "../Shape/shapes";

export class EraserProfileBehavior extends DefaultDrawingProfileBehaviour {
    constructor() {
        super();
        this.Features.add(DrawingShapeStyleFeature.EraserStyle)
        this.Features.add(DrawingShapeStyleFeature.EraserWidth)
    }

    isSupport(profile: DrawingProfile, feature: DrawingShapeStyleFeature): boolean {
        return false
    }
}
