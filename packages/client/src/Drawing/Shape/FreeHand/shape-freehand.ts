import {DrawingShape, SupportedShapes} from "../shapes";

export interface ShapeFreehand extends DrawingShape {
    type: SupportedShapes.Freehand
}
