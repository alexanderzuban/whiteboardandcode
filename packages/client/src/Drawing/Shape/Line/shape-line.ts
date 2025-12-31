import {DrawingShape, SupportedShapes} from "../shapes";

export interface ShapeLine extends DrawingShape {
    type: SupportedShapes.Line
}
