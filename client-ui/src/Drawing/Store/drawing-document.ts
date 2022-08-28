import {DrawingShape} from "../Shape/shapes";
import {Point, Rect} from "../../Common/point";
import {Nullable} from "../../Common/generics";
import {DrawingOperation} from "../Operation/operations";
import {ContentDocument, DocumentType} from "../../UI/Content/Store/content.store";
import {v4} from "uuid";


export interface DrawingSelectedShapes {
    keys: number[];
    boundingRect: Nullable<Rect>
}

export enum DrawingShapeChangeType {
    Updated,
    Added,
    Removed
}

export interface DrawingShapeChange {
    shapeId: number;
    type: DrawingShapeChangeType;
    timestamp?: number;
    user?: string;
}


export function newDrawingSelectedShapes() {
    return {
        keys: [],
        boundingRect: null
    } as DrawingSelectedShapes
}

export interface DrawingDocument extends ContentDocument {
    shapes: DrawingShape[];
    operation: Nullable<DrawingOperation>,
    selectedShapes: DrawingSelectedShapes,
    changes: DrawingShapeChange[],
    origin: Point
}

export function newDrawingInstance(): DrawingDocument {
    return {
        uid: v4(),
        type: DocumentType.Drawing,
        name: "New Drawing",
        shapes: [],
        selectedShapes: newDrawingSelectedShapes(),
        operation: null,
        origin: {x: 0, y: 0},
        changes: [],
        unsaved: true
    } as DrawingDocument
}


