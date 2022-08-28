import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {DrawingSettings} from "./drawing-settings.store";

export interface DrawingBackground {
    isDisplayGrid: boolean;
    gridColor?: string;
    gridSize?: number;
    backgroundColor?: string;
}


export const initialDrawingBackground = {
    isDisplayGrid: true,
    gridColor: "#DCDCDC",
    gridSize: 40,
    backgroundColor: "white"
} as DrawingBackground;


class DrawingBackgroundInDispatch {
    setBackgroundDisplayGrid(background: DrawingBackground, displayGrid: boolean) {
        background.isDisplayGrid = displayGrid;
    }

    setBackgroundGridColor(background: DrawingBackground, gridColor: string) {
        background.gridColor = gridColor;
    }

    setBackgroundGridSize(background: DrawingBackground, gridSize: number) {
        background.gridSize = gridSize;
    }

    setBackgroundColor(background: DrawingBackground, backgroundColor: string) {
        background.backgroundColor = backgroundColor;
    }
}

export const inDispatchDrawingBackground = new DrawingBackgroundInDispatch();

export const setBackgroundDisplayGrid: CaseReducer<DrawingSettings, PayloadAction<boolean>>
    = function (state, action) {
    inDispatchDrawingBackground.setBackgroundDisplayGrid(state.background, action.payload);
}

export const setBackgroundGridColor: CaseReducer<DrawingSettings, PayloadAction<string>>
    = function (state, action) {
    inDispatchDrawingBackground.setBackgroundGridColor(state.background, action.payload);
}

export const setBackgroundGridSize: CaseReducer<DrawingSettings, PayloadAction<number>>
    = function (state, action) {
    inDispatchDrawingBackground.setBackgroundGridSize(state.background, action.payload);
}

export const setBackgroundColor: CaseReducer<DrawingSettings, PayloadAction<string>>
    = function (state, action) {
    inDispatchDrawingBackground.setBackgroundColor(state.background, action.payload);
}

