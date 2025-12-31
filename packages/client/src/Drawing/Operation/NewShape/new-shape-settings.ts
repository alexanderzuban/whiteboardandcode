import {DrawingShapeStyle, SupportedShapes} from "../../Shape/shapes";

export default interface NewShapeSettings {
    readonly shape: SupportedShapes,
    readonly style: DrawingShapeStyle
}
