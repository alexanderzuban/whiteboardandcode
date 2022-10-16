import {SupportedShapes} from "../../Shape/shapes";

export default interface NewShapeSettings {
    readonly shape: SupportedShapes,
    fillColor?: string,
    fillStyle?: string,
    lineWidth?: number,
    lineColor?: string,
    lineType?: string
}
