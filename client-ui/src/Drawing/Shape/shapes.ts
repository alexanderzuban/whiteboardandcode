import {Point, Rect} from "../../Common/point";
import {Nullable} from "../../Common/generics";
import {ShapeRectBehavior} from "./Rect/shape-rect-behavior";
import {ShapeLineBehavior} from "./Line/shape-line-behavior";
import {ShapeCircleBehavior} from "./Circle/shape-circle-behavior";
import {ShapeFreehandBehavior} from "./FreeHand/shape-freehand-behavior";
import {ShapePolylineBehavior} from "./Polyline/shape-polyline-behavior";
import NewShapeProperties from "../Operation/NewShape/new-shape-settings";
import {DrawingSettings} from "../Store/drawing-settings.store";
import {DrawingDocument} from "../Store/drawing-document";
import DrawingShapeBehaviorBase from "./drawing-shape-behavior-base";
import {ColorNero} from "../../Common/css-colors";

export enum SupportedShapes {
    None,
    Rect,
    Circle,
    Line,
    Freehand,
    Polyline
}


export interface DrawingContextDocument {
    document: DrawingDocument
}

export interface DrawingContext extends DrawingContextDocument {
    settings: DrawingSettings
}

export interface DrawingShapeStyle {
    lineColor: Nullable<string>;
    fillColor: Nullable<string>;
    fillStyle?: Nullable<string>;

    lineWidth?: number;
    lineType?: Nullable<string>;

    lineStart?: Nullable<string>;
    lineEnd?: Nullable<string>;
}

export const DefaultShapeStyle = {
    lineColor: ColorNero,
    lineWidth: 1,
    fillColor: ""
} as DrawingShapeStyle

export interface DrawingShape {
    type: SupportedShapes;
    key: number;
    name: Nullable<String>,
    points: number[];

    start: Nullable<Point>;
    end: Nullable<Point>;

    boundingRect: Nullable<Rect>;
    label: Nullable<string>;
    rotate: Nullable<number>;

    style: Nullable<DrawingShapeStyle>

}


export interface DrawingShapeSettings {
    suppressBoundingRectOnCreation: boolean;
}

export interface DrawingShapePainter {
    paint(shape: DrawingShape, context2d: CanvasRenderingContext2D): void;
}

export interface DrawingShapeBehavior {
    getSettings(shape: DrawingShape): DrawingShapeSettings;

    newInstance(drawing: DrawingContext, payload: any): DrawingShape;

    demoInstance(size: number, profile?: NewShapeProperties): DrawingShape;

    extendTo(shape: DrawingShape, context: Nullable<DrawingContextDocument>, point: Point): DrawingShape;

    getPainter(): DrawingShapePainter;

    complete(shape: DrawingShape, context: Nullable<DrawingContextDocument>, point: Point, force: boolean): boolean;

    translateShape(shape: DrawingShape, context: Nullable<DrawingContextDocument>, dx: number, dy: number): void;

    isShapeTouchOrOverlap(shape: DrawingShape, ...points: Point[]): boolean;

    shapeProfile(shape: DrawingShape): NewShapeProperties;


    getPointsCount(shape: DrawingShape): number

    getPointAt(shape: DrawingShape, index: number): Point

    setPointAt(shape: DrawingShape, index: number, point: Point): void

    removePointAt(shape: DrawingShape, index: number): number

    pushPoint(shape: DrawingShape, point: Point): number

    iteratePoints(shape: DrawingShape, consumer: (x: number, y: number, index: number) => void): void

}


const ShapesLookup = new Map<SupportedShapes, DrawingShapeBehavior>([
    [SupportedShapes.Rect, new ShapeRectBehavior()],
    [SupportedShapes.Line, new ShapeLineBehavior()],
    [SupportedShapes.Circle, new ShapeCircleBehavior()],
    [SupportedShapes.Polyline, new ShapePolylineBehavior()],
    [SupportedShapes.Freehand, new ShapeFreehandBehavior()]
]);

export function getShapeBehavior(shapeType: SupportedShapes): DrawingShapeBehavior {
    return ShapesLookup.get(shapeType) ?? new DrawingShapeBehaviorBase();
}
