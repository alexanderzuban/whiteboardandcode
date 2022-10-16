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
import {DrawingProfile} from "../Profile/profile";
import {Nullable} from "../../Common/generics";
import DefaultDrawProfiles from "../Profile/draw-profiles";
import {logger} from "../../Common/debug";

export interface DrawingSettings {
    activeProfile: Nullable<string>,
    readonly background: DrawingBackground,
    readonly selectedOperation: SupportedOperations,
    drawingProfiles: DrawingProfile[]
}


const initialState = {
    background: initialDrawingBackground,
    activeProfile: undefined,
    selectedOperation: SupportedOperations.None,
    drawingProfiles: []
} as DrawingSettings;

initialState.drawingProfiles.push(...DefaultDrawProfiles);

const sliceDrawingSettings = createSlice({
        name: 'drawingSettings',
        initialState,
        reducers: {
            setBackgroundDisplayGrid,
            setBackgroundGridColor,
            setBackgroundGridSize,
            setBackgroundColor,

            drawingProfileSelect(state, action: PayloadAction<string>) {
                logger.debug("drawingProfileSelect", action)

                state.activeProfile = action.payload
            },

            drawingOperationSelect(state, action: PayloadAction<SupportedOperations>) {
                logger.debug("drawingOperationSelect", action)

                state.selectedOperation = action.payload
            }
        }
    }
);


export const sliceActionsDrawingSettings = sliceDrawingSettings.actions;

export default sliceDrawingSettings;
