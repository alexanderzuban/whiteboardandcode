import {Nullable} from "../../Common/generics";
import {DrawingOperation} from "../Operation/operations";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import NewShapeSettings from "../Operation/NewShape/new-shape-settings";
import {DrawingShapeStyleFeature} from "../Shape/shapes";
import {DefaultPalette, DefaultTransparentPalette} from "../../Common/css-colors";


export enum DrawingProfileType {
    None,
    Freehand,
    Highlighter,
    Eraser
}

export interface DrawingProfile {
    name: Nullable<string>,
    description: Nullable<string>,
    uid: string,
    icon: Nullable<IconProp>,
    settings: Nullable<NewShapeSettings>,
    operation: DrawingOperation,
    removable: Nullable<boolean>,
    type: Nullable<DrawingProfileType>
}

export interface DrawingProfileBehaviour {
    isSupport(profile: DrawingProfile, feature: DrawingShapeStyleFeature): boolean;

    palette(profile: DrawingProfile, feature: DrawingShapeStyleFeature): string[]

    hasNoColor(profile: DrawingProfile, feature: DrawingShapeStyleFeature): boolean

    sizes(profile: DrawingProfile, feature: DrawingShapeStyleFeature): string[];
}

export class DefaultDrawingProfileBehaviour implements DrawingProfileBehaviour {

    Features = new Set<DrawingShapeStyleFeature>(
        [
            DrawingShapeStyleFeature.LineColor,
            DrawingShapeStyleFeature.FillColor,
            DrawingShapeStyleFeature.FillStyle,
            DrawingShapeStyleFeature.LineWidth,
            DrawingShapeStyleFeature.LineType,
            DrawingShapeStyleFeature.LineStart,
            DrawingShapeStyleFeature.LineEnd
        ]);

    isSupport(profile: DrawingProfile, feature: DrawingShapeStyleFeature): boolean {
        return this.Features.has(feature)
    }

    palette(profile: DrawingProfile, feature: DrawingShapeStyleFeature): string[] {
        if (feature === DrawingShapeStyleFeature.FillColor) {
            return DefaultTransparentPalette
        }
        return DefaultPalette
    }

    hasNoColor(profile: DrawingProfile, feature: DrawingShapeStyleFeature): boolean {
        return true;
    }

    sizes(profile: DrawingProfile, feature: DrawingShapeStyleFeature): string[] {
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    }
}

