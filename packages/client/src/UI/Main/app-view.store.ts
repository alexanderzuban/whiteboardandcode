import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Size} from "../../Common/size";
import {logger} from "../../Common/debug";


export interface AppViewState {
    readonly size: Size,
    contentSize: Size,
    readonly isFocused: boolean
}


const initialState = {
    size: {width: 0, height: 0} as Size,
    contentSize: {width: 0, height: 0} as Size,
    isFocused: false
} as AppViewState;

const sliceAppView = createSlice({
    name: 'appView',
    initialState,
    reducers: {
        resize(state, action: PayloadAction<Size>) {
            logger.log(`Window Resized (${action.payload.width}  ${action.payload.height})`)
            state.size.width = action.payload.width;
            state.size.height = action.payload.height;
        },
        focusChanged(state, action: PayloadAction<{ focused: boolean }>) {
            logger.log(`Focus Changed (${action.payload.focused})`)
            state.isFocused = action.payload.focused;
        },
        contentSize(state, action: PayloadAction<Size>) {
            state.contentSize.width = action.payload.width;
            state.contentSize.height = action.payload.height;
        }
    },
});


export const sliceActionsAppView = sliceAppView.actions;

export default sliceAppView;
