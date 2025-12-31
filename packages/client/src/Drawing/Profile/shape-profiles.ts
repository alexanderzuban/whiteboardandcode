import {DrawingProfile, DrawingProfileType} from "./profile";
import {DrawingOperation, SupportedOperations} from "../Operation/operations";
import {DrawingShapeStyle, SupportedShapes} from "../Shape/shapes";
import {ColorNero} from "../../Common/css-colors";
import NewShapeSettings from "../Operation/NewShape/new-shape-settings";

const DefaultShapeProfiles: DrawingProfile[] = [];

const Rect = {
    description: "Rectangle",
    name: "Rect",
    operation: {type: SupportedOperations.NewShape} as DrawingOperation,
    settings: {
        shape: SupportedShapes.Rect,
        style: {
            lineColor: ColorNero,
            lineWidth: 3
        } as DrawingShapeStyle
    } as NewShapeSettings,
    type: DrawingProfileType.Shape,
    uid: "rect-1"
} as DrawingProfile;

const Circle = {
    description: "Circle",
    name: "Circle",
    operation: {type: SupportedOperations.NewShape} as DrawingOperation,
    settings: {
        shape: SupportedShapes.Circle,
        style: {
            lineColor: ColorNero,
            lineWidth: 3
        } as DrawingShapeStyle
    } as NewShapeSettings,
    type: DrawingProfileType.Shape,
    uid: "circle-1"
} as DrawingProfile;

const Line = {
    description: "Line",
    name: "Line",
    operation: {type: SupportedOperations.NewShape} as DrawingOperation,
    settings: {
        shape: SupportedShapes.Line,
        style: {
            lineColor: ColorNero,
            lineWidth: 3
        } as DrawingShapeStyle
    } as NewShapeSettings,
    type: DrawingProfileType.Shape,
    uid: "line-1"
} as DrawingProfile;

const Polyline = {
    description: "Polyline",
    name: "Polyline",
    operation: {type: SupportedOperations.NewShape} as DrawingOperation,
    settings: {
        shape: SupportedShapes.Polyline,
        style: {
            lineColor: ColorNero,
            lineWidth: 3
        } as DrawingShapeStyle
    } as NewShapeSettings,
    type: DrawingProfileType.Shape,
    uid: "polyline-1"
} as DrawingProfile;


DefaultShapeProfiles.push(Rect);
DefaultShapeProfiles.push(Circle);
DefaultShapeProfiles.push(Line);
DefaultShapeProfiles.push(Polyline);

export default DefaultShapeProfiles;
