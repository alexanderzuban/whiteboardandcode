import {Point} from "../../Common/point";
import {DrawingShape, getShapeBehavior} from "../Shape/shapes";
import {Nullable, withNullable} from "../../Common/generics";
import {inDispatchSelectedShapes} from "./drawing-select-operation-settings";

import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {ContentState} from "../../UI/Content/Store/content.store";
import {withCurrentDrawingDocument} from "../../UI/Content/Store/content.store.common";
import {logger} from "../../Common/debug";
import {DrawingDocument, DrawingShapeChange, DrawingShapeChangeType} from "./drawing-document";

class DrawingDocumentInDispatch {
    recordChange(document: Nullable<DrawingDocument>, type: DrawingShapeChangeType, shapeId: number) {
        if (!document) return;

        document.changes.push({
            type,
            shapeId
        } as DrawingShapeChange)
    }


    removeShapes(document: DrawingDocument, forRemoval: number[]) {
        const lookup = new Set<number>(forRemoval);
        document.shapes = document.shapes.filter(s => {
            if (lookup.has(s.key)) {
                this.recordChange(document, DrawingShapeChangeType.Removed, s.key)
                return false;
            }
            return true;
        });
    }


    selectShapeUnder(document: DrawingDocument, point: Point) {
        const shapeUnderThePoint = document.shapes
            .find(s =>
                getShapeBehavior(s.type)?.isShapeTouchOrOverlap(s, point)
            );
        withNullable(shapeUnderThePoint, shape => {
                inDispatchSelectedShapes.selectedUpdate(document, [shape.key]);
            },
            () => {
                inDispatchSelectedShapes.selectedClear(document);
            })

    }

    appendShape(document: DrawingDocument, shape: DrawingShape) {
        document.shapes.push(shape)
        this.recordChange(document, DrawingShapeChangeType.Added, shape.key)
    }
}


export const drawingMoveOrigin: CaseReducer<ContentState, PayloadAction<{ dx: number, dy: number }>> =
    function (state, action) {
        withCurrentDrawingDocument(state, document => {
            document.origin.x += action.payload.dx;
            document.origin.y += action.payload.dy;
            logger.log("Viewport Origin", document.origin);
        })
    }


const inDispatchDocument = new DrawingDocumentInDispatch();
export default inDispatchDocument;
