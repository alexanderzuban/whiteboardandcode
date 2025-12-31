import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface TextEditorLanguage {
    uid: string,
    description: string
}

export interface TextEditorSettings {
    languages: TextEditorLanguage[]
}

const initialState = {
    languages: []
} as TextEditorSettings;


const sliceTextEditorSettings = createSlice({
    name: 'textEditorSettings',
    initialState,
    reducers: {
        initLanguages: (state: TextEditorSettings, action: PayloadAction<TextEditorLanguage[]>) => {
            state.languages = action.payload
        }
    }
});


export const sliceActionsTextEditor = sliceTextEditorSettings.actions;

export default sliceTextEditorSettings;
