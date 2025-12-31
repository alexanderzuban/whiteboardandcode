import {FreehandProfileBehavior} from "./freehand-profile";
import {HighlighterProfileBehavior} from "./highlighter-profile";
import {EraserProfileBehavior} from "./eraser-profile";
import {Nullable} from "../../Common/generics";
import {DefaultDrawingProfileBehaviour, DrawingProfile, DrawingProfileBehaviour, DrawingProfileType} from "./profile";
import {ShapeProfileBehavior} from "./shape-profile";

const ProfileLookup = new Map<DrawingProfileType, DrawingProfileBehaviour>([
    [DrawingProfileType.Freehand, new FreehandProfileBehavior()],
    [DrawingProfileType.Highlighter, new HighlighterProfileBehavior()],
    [DrawingProfileType.Eraser, new EraserProfileBehavior()],
    [DrawingProfileType.Shape, new ShapeProfileBehavior()],
    [DrawingProfileType.None, new DefaultDrawingProfileBehaviour()]
]);

export default function getProfileBehavior(profile: DrawingProfile): Nullable<DrawingProfileBehaviour> {
    const type = profile.type ?? DrawingProfileType.None;
    return ProfileLookup.get(type);
}
