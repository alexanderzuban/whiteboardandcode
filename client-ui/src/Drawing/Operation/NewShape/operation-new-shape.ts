import {fromNullable, Nullable, withNullable} from "../../../Common/generics";
import {calcBoundingRect, Point} from "../../../Common/point";
import {DrawingContext, DrawingShape, getShapeBehavior, SupportedShapes} from "../../Shape/shapes";
import {DrawingOperation, DrawingOperationHandler, Painter, SupportedOperations} from "../operations";
import {OperationNewShapePainter} from "./operation-new-shape-painter";
import {CssCursors} from "../../../Common/css-cursors";
import inDispatchDocument from "../../Store/drawing-document-in-dispatch";
import {logger} from "../../../Common/debug";

export interface OperationNewShape extends DrawingOperation {
    type: SupportedOperations.NewShape,
    shapeType: SupportedShapes;
    start: Nullable<Point>;
    topLeft: Nullable<Point>;
    bottomRight: Nullable<Point>;
    end: Nullable<Point>;
    currentShape: Nullable<DrawingShape>;
}


export class OperationNewShapeHandler implements DrawingOperationHandler {
    start(context: DrawingContext, payload: Point): Nullable<OperationNewShape> {
        return {
            type: SupportedOperations.NewShape,
            shapeType: context.settings.newShapeSettings.shape,
            currentShape: null,
            start: payload,
            end: payload,
            topLeft: payload,
            bottomRight: payload
        } as OperationNewShape;
    }

    cancel(operation: Nullable<OperationNewShape>, context: DrawingContext): Nullable<OperationNewShape> {
        return null;
    }

    update(operation: OperationNewShape, context: DrawingContext, payload: Point): OperationNewShape {
        if (!operation.currentShape) {
            operation.currentShape = fromNullable(getShapeBehavior(operation.shapeType), behaviour => {
                return behaviour.newInstance(context, operation.start);
            });
        }
        this.updateCurrentBoundaries(operation, context, payload);

        return operation;
    }

    private updateCurrentBoundaries(operation: OperationNewShape, context: DrawingContext, payload: Point) {
        withNullable(calcBoundingRect(operation.start, payload), rect => {
            operation.topLeft = rect.topLeft;
            operation.bottomRight = rect.bottomRight;
        });


        withNullable(operation.currentShape, shape => {
            getShapeBehavior(shape.type)?.extendTo(shape, context, payload);
        });
    }

    getPainter(): Nullable<Painter> {
        return new OperationNewShapePainter();
    }

    getOperationCursor(operation: Nullable<DrawingOperation>): CssCursors {
        if (operation) {
            return "e-resize";
        }
        return "default";
    }

    end(operation: Nullable<OperationNewShape>, context: DrawingContext): Nullable<OperationNewShape> {
        if (!operation || !operation.currentShape)
            return null;

        logger.log("OperationNewShape", "end")


        withNullable(operation.currentShape, shape => {
            getShapeBehavior(shape.type)?.complete(shape, context, shape.end!, true);
        });

        inDispatchDocument.appendShape(context.document, operation.currentShape)


        return null;
    }

    complete(operation: Nullable<OperationNewShape>, context: DrawingContext, payload: Point): Nullable<OperationNewShape> {
        if (!operation || !operation.currentShape)
            return null;

        logger.log("OperationNewShape", "complete")
        this.updateCurrentBoundaries(operation, context, payload);

        let willResume = false;
        withNullable(operation.currentShape, shape => {
            willResume = getShapeBehavior(shape.type)?.complete(shape, context, payload, false) ?? false;
        });

        if (!willResume) {
            inDispatchDocument.appendShape(context.document, operation.currentShape)
            return null;
        }

        return operation;
    }

    resume(operation: Nullable<OperationNewShape>, context: DrawingContext, payload: Point): Nullable<OperationNewShape> {
        return null;
    }
}
