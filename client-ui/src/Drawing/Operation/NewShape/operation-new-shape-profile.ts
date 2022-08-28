import {SupportedShapes} from "../../Shape/shapes";

export default interface NewShapeProfile {
    name?: string,
    key?: number,
    readonly shape: SupportedShapes,
    fillColor?: string,
    fillStyle?: string,
    lineWidth?: number,
    lineColor?: string,
    lineType?: string
}
