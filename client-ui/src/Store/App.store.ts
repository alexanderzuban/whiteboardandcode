import {CombinedState, combineReducers, configureStore} from '@reduxjs/toolkit'
import sliceAppView, {AppViewState} from "../UI/Main/app-view.store";
import sliceAppHotKeys, {AppHotKeysState} from "../UI/Drawing/HotKey/hotkeys.store";
import sliceDrawingSettings, {DrawingSettings} from "../Drawing/Store/drawing-settings.store";
import sliceContent, {ContentState} from "../UI/Content/Store/content.store";

import {persistReducer, persistStore} from 'redux-persist'
import createIdbStorage from "./indexed-db-storage";
import {PersistConfig} from "redux-persist/es/types";
import sliceTextEditorSettings, {TextEditorSettings} from "../Text/Store/text-editor-settings.store";

const rootReducer = combineReducers({
    appView: sliceAppView.reducer,
    appHotKeys: sliceAppHotKeys.reducer,
    drawingSettings: sliceDrawingSettings.reducer,
    content: sliceContent.reducer,
    textSettings: sliceTextEditorSettings.reducer
})


const persistConfig = {
    key: 'root',
    storage: createIdbStorage({
        name: "wandc-db-02",
        version: 2,
        storeName: "state",
    }),
    serialize: false,
    deserialize: false,
    throttle: 1000
} as PersistConfig<CombinedState<{
    appView: AppViewState,
    appHotKeys: AppHotKeysState,
    drawingSettings: DrawingSettings,
    content: ContentState,
    textSettings: TextEditorSettings
}>>;

const reducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer,
});

export const persistor = persistStore(store)
export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store
