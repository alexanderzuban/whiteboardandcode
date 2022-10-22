import {DefaultDrawingProfileBehaviour, DrawingProfile} from "./profile";
import {DrawingShapeStyleFeature} from "../Shape/shapes";
import {DefaultTransparentPalette} from "../../Common/css-colors";

export class HighlighterProfileBehavior extends DefaultDrawingProfileBehaviour {
    constructor() {
        super();
        this.Features.delete(DrawingShapeStyleFeature.FillColor);
        this.Features.delete(DrawingShapeStyleFeature.FillStyle);
    }

    palette(profile: DrawingProfile, feature: DrawingShapeStyleFeature): string[] {
        return DefaultTransparentPalette
    }

    hasNoColor(profile: DrawingProfile, feature: DrawingShapeStyleFeature): boolean {
        return false
    }

    sizes(profile: DrawingProfile, feature: DrawingShapeStyleFeature): string[] {
        return ["10", "15", "20", "25", "30", "35", "40"];
    }
}
