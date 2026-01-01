import {Nullable} from "../../../Common/generics";
import {Point} from "../../../Common/point";
import {DrawingContext, DrawingShape} from "../../Shape/shapes";
import {DrawingOperation, DrawingOperationHandler, Painter, SupportedOperations} from "../operations";
import {OperationHoverPainter} from "./operation-hover-painter";
import {CssCursors} from "../../../Common/css-cursors";

export interface OperationHover extends DrawingOperation {
    type: SupportedOperations.Hover,
    currentShape: Nullable<DrawingShape>;
    cursorPosition: Nullable<Point>;
}


export class OperationHoverHandler implements DrawingOperationHandler {
    start(context: DrawingContext, payload: Point): Nullable<OperationHover> {
        return {
            type: SupportedOperations.Hover,
            currentShape: null,
            cursorPosition: payload
        } as OperationHover;
    }

    cancel(operation: Nullable<OperationHover>, context: DrawingContext): Nullable<OperationHover> {
        return null;
    }

    update(operation: OperationHover, context: DrawingContext, payload: Point): OperationHover {
        operation.cursorPosition = payload;

        // Find shape under cursor
        const shapeUnderCursor = this.findShapeAtPoint(context, payload);
        operation.currentShape = shapeUnderCursor;

        return operation;
    }

    private findShapeAtPoint(context: DrawingContext, point: Point): Nullable<DrawingShape> {
        // Iterate shapes in reverse order (top-most first)
        const shapes = context.document.shapes;
        for (let i = shapes.length - 1; i >= 0; i--) {
            const shape = shapes[i];
            if (this.isPointInShape(shape, point)) {
                return shape;
            }
        }
        return null;
    }

    private isPointInShape(shape: DrawingShape, point: Point): boolean {
        if (!shape.boundingRect || !shape.boundingRect.topLeft || !shape.boundingRect.bottomRight) {
            return false;
        }

        const rect = shape.boundingRect;
        const padding = 5; // Hit tolerance

        // Check if point is within bounding rect with some padding
        return (
            point.x >= rect.topLeft.x - padding &&
            point.x <= rect.bottomRight.x + padding &&
            point.y >= rect.topLeft.y - padding &&
            point.y <= rect.bottomRight.y + padding
        );
    }

    getPainter(): Nullable<Painter> {
        return new OperationHoverPainter();
    }

    getOperationCursor(operation: Nullable<OperationHover>): CssCursors {
        if (operation?.currentShape) {
            return "pointer";
        }
        return "default";
    }

    end(operation: Nullable<OperationHover>, context: DrawingContext): Nullable<OperationHover> {
        return null;
    }

    complete(operation: Nullable<OperationHover>, context: DrawingContext, payload: Point): Nullable<OperationHover> {
        return null;
    }

    resume(operation: Nullable<OperationHover>, context: DrawingContext, payload: Point): Nullable<OperationHover> {
        return null;
    }
}
