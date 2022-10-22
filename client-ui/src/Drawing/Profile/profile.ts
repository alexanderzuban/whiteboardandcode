import {Nullable} from "../../Common/generics";
import {DrawingOperation} from "../Operation/operations";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import NewShapeSettings from "../Operation/NewShape/new-shape-settings";

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
