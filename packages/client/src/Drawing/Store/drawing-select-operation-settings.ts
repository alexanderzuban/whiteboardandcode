import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {fromNullable, withNullable} from "../../Common/generics";
import {calcBoundingRect, movePoint, Point, Rect} from "../../Common/point";
import {getShapeBehavior} from "../Shape/shapes";

import {DrawingDocument} from "./drawing-document";
import {ContentState} from "../../UI/Content/Store/content.store";
import inDispatchDocument from "./drawing-document-in-dispatch";
import {withCurrentDrawingDocument} from "../../UI/Content/Store/content.store.common";
import {logger} from "../../Common/debug";


class DrawingSelectedShapesInDispatch {
    selectedClear(document: DrawingDocument) {
        logger.log("selectedClearInDispatch")
        document.selectedShapes.keys = []
        document.selectedShapes.boundingRect = null
    }

    selectedUpdate(document: DrawingDocument, keys: number[]) {
        logger.log("selectedUpdateInDispatch")
        const lookup = new Set<number>(keys);
        document.selectedShapes.keys = keys
        const min: Point[] = new Array(lookup.size);
        const max: Point[] = new Array(lookup.size);
        document.shapes
            .filter(s => lookup.has(s.key))
            .forEach(s => {
                withNullable(s.boundingRect, rect => {
                    min.push(rect.topLeft)
                    max.push(rect.bottomRight)
                });
            })

        document.selectedShapes.boundingRect = null

        const topLeft = fromNullable(calcBoundingRect(...min), rect => rect.topLeft)
        const bottomRight = fromNullable(calcBoundingRect(...max), rect => rect.bottomRight)
        if (topLeft && bottomRight) {
            document.selectedShapes.boundingRect = {
                topLeft,
                bottomRight
            } as Rect;
        }
    }


    selectedAppend(document: DrawingDocument, toAppend: number[]) {
        const selected = new Set<number>(document.selectedShapes.keys)
        toAppend.forEach(key => selected.add(key))
        this.selectedUpdate(document, Array.from(selected.values()))
    }


    selectedRemove(document: DrawingDocument, toRemove: number[]) {
        const selected = new Set<number>(document.selectedShapes.keys);
        toRemove.forEach(key => selected.delete(key))
        this.selectedUpdate(document, Array.from(selected.values()))
    }

    translate(document: DrawingDocument, move: { dx: number; dy: number }) {
        const selectedLookup = new Set<number>(document.selectedShapes.keys)
        document.shapes.filter(s => selectedLookup.has(s.key))
            .forEach(s => {
                getShapeBehavior(s.type)?.translateShape(s, {document}, move.dx, move.dy)
            })

        withNullable(document.selectedShapes.boundingRect, rect => {
            movePoint(rect.topLeft, move.dx, move.dy)
            movePoint(rect.bottomRight, move.dx, move.dy)
        })
    }
}

export const inDispatchSelectedShapes = new DrawingSelectedShapesInDispatch();


export const drawingSelectedTranslate: CaseReducer<ContentState, PayloadAction<{ dx: number, dy: number }>>
    = function (state, action) {
    withCurrentDrawingDocument(state, document => {
        inDispatchSelectedShapes.translate(document, action.payload)
    })

}

export const drawingSelectedAppend: CaseReducer<ContentState, PayloadAction<number[]>>
    = function (state, action) {
    withCurrentDrawingDocument(state, document => {
        inDispatchSelectedShapes.selectedAppend(document, action.payload)
    })
}

export const drawingSelectedRemove: CaseReducer<ContentState, PayloadAction<number[]>>
    = function (state, action) {
    withCurrentDrawingDocument(state, document => {
        inDispatchSelectedShapes.selectedRemove(document, action.payload)
    })
}

export const drawingSelectedClear: CaseReducer<ContentState, PayloadAction<number[]>>
    = function (state, action) {
    withCurrentDrawingDocument(state, document => {
        inDispatchSelectedShapes.selectedClear(document)
    })
}

export const drawingSelectAll: CaseReducer<ContentState>
    = function (state) {
    withCurrentDrawingDocument(state, document => {
        inDispatchSelectedShapes.selectedUpdate(document, document.shapes.map(s => s.key));
    })
}


export const drawingSelectedDelete: CaseReducer<ContentState>
    = function (state) {
    withCurrentDrawingDocument(state, document => {
        inDispatchDocument.removeShapes(document, document.selectedShapes.keys);
        inDispatchSelectedShapes.selectedClear(document)
    })
}
