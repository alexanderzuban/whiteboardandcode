import {DrawingProfile, DrawingProfileType} from "./profile";
import {DrawingOperation, SupportedOperations} from "../Operation/operations";
import {DrawingShapeStyle, SupportedShapes} from "../Shape/shapes";
import {
    ColorCrimson,
    ColorNero,
    ColorPigmentGreen,
    ColorTransparentBurntOrange,
    ColorTransparentYellow
} from "../../Common/css-colors";
import NewShapeSettings from "../Operation/NewShape/new-shape-settings";

const DefaultDrawProfiles: DrawingProfile[] = [];

const Pen1 = {
    description: "Pen",
    name: "Pen",
    operation: {type: SupportedOperations.NewShape} as DrawingOperation,
    settings: {
        shape: SupportedShapes.Freehand,
        style: {
            lineColor: ColorNero,
            lineWidth: 3
        } as DrawingShapeStyle
    } as NewShapeSettings,
    icon: ["fas", "pen"],
    type: DrawingProfileType.Freehand,
    uid: "pen-1"
} as DrawingProfile;

const Pen2 = {
    description: "Pen",
    name: "Pen",
    operation: {type: SupportedOperations.NewShape} as DrawingOperation,
    settings: {
        shape: SupportedShapes.Freehand,
        style: {
            lineColor: ColorCrimson,
            lineWidth: 3
        } as DrawingShapeStyle
    } as NewShapeSettings,
    icon: ["fas", "pen"],
    type: DrawingProfileType.Freehand,
    uid: "pen-2"
} as DrawingProfile;

const Pen3 = {
    description: "Pen",
    name: "Pen",
    operation: {type: SupportedOperations.NewShape} as DrawingOperation,
    settings: {
        shape: SupportedShapes.Freehand,
        style: {
            lineColor: ColorPigmentGreen,
            lineWidth: 3
        } as DrawingShapeStyle
    } as NewShapeSettings,
    icon: ["fas", "pen"],
    type: DrawingProfileType.Freehand,
    uid: "pen-3"
} as DrawingProfile;

const Highlighter1 = {
    description: "Highlighter",
    name: "Highlighter",
    operation: {type: SupportedOperations.NewShape} as DrawingOperation,
    settings: {
        shape: SupportedShapes.Highlighter,
        style: {
            lineColor: ColorTransparentYellow,
            lineWidth: 7
        } as DrawingShapeStyle
    } as NewShapeSettings,
    icon: ["fas", "highlighter"],
    type: DrawingProfileType.Highlighter,
    uid: "highlighter-1"
} as DrawingProfile;

const Highlighter2 = {
    description: "Highlighter",
    name: "Highlighter",
    operation: {type: SupportedOperations.NewShape} as DrawingOperation,
    settings: {
        shape: SupportedShapes.Highlighter,
        style: {
            lineColor: ColorTransparentBurntOrange,
            lineWidth: 7
        } as DrawingShapeStyle
    } as NewShapeSettings,
    icon: ["fas", "highlighter"],
    type: DrawingProfileType.Highlighter,
    uid: "highlighter-2"
} as DrawingProfile;


const Eraser = {
    description: "Eraser",
    name: "Eraser",
    operation: {type: SupportedOperations.Erase} as DrawingOperation,
    icon: ["fas", "eraser"],
    type: DrawingProfileType.Eraser,
    uid: "eraser-1"
} as DrawingProfile;

DefaultDrawProfiles.push(Pen1);
DefaultDrawProfiles.push(Pen2);
DefaultDrawProfiles.push(Pen3);
DefaultDrawProfiles.push(Highlighter1);
DefaultDrawProfiles.push(Highlighter2);
DefaultDrawProfiles.push(Eraser);

export default DefaultDrawProfiles;
