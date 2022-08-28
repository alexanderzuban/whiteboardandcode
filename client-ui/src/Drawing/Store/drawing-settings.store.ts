import {
    DrawingNewShapeSettings,
    initialStateNewShapeSettings,
    newShapeRegisterProfile,
    newShapeSelectFillColor,
    newShapeSelectFillStyle,
    newShapeSelectLineColor,
    newShapeSelectLineType,
    newShapeSelectLineWidth,
    newShapeSelectProfile
} from "./drawing-new-shape-settings";
import {
    DrawingBackground,
    initialDrawingBackground,
    setBackgroundColor,
    setBackgroundDisplayGrid,
    setBackgroundGridColor,
    setBackgroundGridSize
} from "./drawing-background";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SupportedOperations} from "../Operation/operations";

export interface DrawingSettings {
    readonly newShapeSettings: DrawingNewShapeSettings
    readonly background: DrawingBackground,
    readonly selectedOperation: SupportedOperations,
}


const initialState = {
    background: initialDrawingBackground,
    newShapeSettings: initialStateNewShapeSettings(),
    selectedOperation: SupportedOperations.NewShape,
} as DrawingSettings;

const sliceDrawingSettings = createSlice({
        name: 'drawingSettings',
        initialState,
        reducers: {

            newShapeRegisterProfile,
            newShapeSelectProfile,
            newShapeSelectFillColor,
            newShapeSelectFillStyle,
            newShapeSelectLineWidth,
            newShapeSelectLineColor,
            newShapeSelectLineType,

            setBackgroundDisplayGrid,
            setBackgroundGridColor,
            setBackgroundGridSize,
            setBackgroundColor,

            drawingOperationSelect(state, action: PayloadAction<SupportedOperations>) {
                state.selectedOperation = action.payload
            }
        }
    }
);


export const sliceActionsDrawingSettings = sliceDrawingSettings.actions;

export default sliceDrawingSettings;
