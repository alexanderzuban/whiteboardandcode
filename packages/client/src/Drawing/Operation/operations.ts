import {Nullable} from "../../Common/generics";

import {OperationPanHandler} from "./Pan/operation-pan";
import {OperationNewShapeHandler} from "./NewShape/operation-new-shape";
import {OperationSelectHandler} from "./Select/operation-select";
import {OperationTranslateHandler} from "./Translate/operation-translate";
import {OperationHoverHandler} from "./Hover/operation-hover";
import {OperationEraseHandler} from "./Erase/operation-erase";
import {DrawingContext} from "../Shape/shapes";
import {CssCursors} from "../../Common/css-cursors";
import {OperationNoneHandler} from "./None/operation-none";
import {OperationCopyTranslateHandler} from "./CopyTranslate/operation-copy-translate";


export enum SupportedOperations {
    None,
    Pan,
    NewShape,
    Select,
    Translate,
    CopyTranslate,
    Scale,
    Hover,
    Erase
}

export interface DrawingOperation {
    readonly  type: SupportedOperations;
}

export interface Painter {
    paint(operation: DrawingOperation, context: DrawingContext, context2d: CanvasRenderingContext2D): void;
}


export interface DrawingOperationHandler {

    resume(operation: Nullable<DrawingOperation>, context: DrawingContext, payload: any): Nullable<DrawingOperation>;

    start(context: DrawingContext, payload?: any): Nullable<DrawingOperation>;

    update(operation: Nullable<DrawingOperation>, context: DrawingContext, payload: any): Nullable<DrawingOperation>;

    getPainter(): Nullable<Painter>;

    getOperationCursor(operation: Nullable<DrawingOperation>): CssCursors;

    complete(operation: Nullable<DrawingOperation>, context: DrawingContext, payload: any): Nullable<DrawingOperation>;

    cancel(operation: Nullable<DrawingOperation>, context: DrawingContext): Nullable<DrawingOperation>;

    end(operation: Nullable<DrawingOperation>, context: DrawingContext): Nullable<DrawingOperation>;
}

const OperationsLookup = new Map<SupportedOperations, DrawingOperationHandler>([
    [SupportedOperations.None, new OperationNoneHandler()],
    [SupportedOperations.Pan, new OperationPanHandler()],
    [SupportedOperations.NewShape, new OperationNewShapeHandler()],
    [SupportedOperations.Select, new OperationSelectHandler()],
    [SupportedOperations.Translate, new OperationTranslateHandler()],
    [SupportedOperations.CopyTranslate, new OperationCopyTranslateHandler()],
    [SupportedOperations.Hover, new OperationHoverHandler()],
    [SupportedOperations.Erase, new OperationEraseHandler()],
]);

export default function getOperationHandler(operation: SupportedOperations): Nullable<DrawingOperationHandler> {
    return OperationsLookup.get(operation) ?? null;
}
