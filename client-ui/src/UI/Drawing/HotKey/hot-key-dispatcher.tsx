import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import store, {AppState} from "../../../Store/App.store";
import HotKeySetup from "./hot-key-setup";
import {SupportedOperations} from "../../../Drawing/Operation/operations";
import {sliceActionsAppHotKeys, SupportedHotKeyCategories} from "./hotkeys.store";
import {sliceActionsDrawingSettings} from "../../../Drawing/Store/drawing-settings.store";
import {logger} from "../../../Common/debug";


const HotKeyDispatcher: React.FC = (props) => {

    const [initialized, setInitialized] = useState(false);

    const selectedHotKey = useSelector((state: AppState) => state.appHotKeys.toggledKey);
    const dispatch = useDispatch();

    logger.log("HotKeyDispatcher", initialized, selectedHotKey);

    useEffect(() => {
        if (initialized && selectedHotKey !== "") {
            const selectedCategory = store.getState().appHotKeys.toggledCategory;
            const category = store.getState().appHotKeys.categories.find(c => c.key === selectedCategory);
            if (category) {
                const index = parseInt(selectedHotKey);
                logger.log("HotKeyDispatcher", selectedCategory, index, category.actions[index]);
                switch (selectedCategory) {
                    case SupportedHotKeyCategories.ShapeProfile:
                        dispatch(sliceActionsDrawingSettings.newShapeSelectProfile(Number(category.actions[index])));
                        break;
                    case SupportedHotKeyCategories.LineColor:
                        dispatch(sliceActionsDrawingSettings.newShapeSelectLineColor(category.actions[index]));
                        break;
                    case SupportedHotKeyCategories.LineWidth:
                        dispatch(sliceActionsDrawingSettings.newShapeSelectLineWidth(parseInt(category.actions[index])));
                        break;
                    case SupportedHotKeyCategories.FillColor:
                        dispatch(sliceActionsDrawingSettings.newShapeSelectFillColor(category.actions[index]));
                        break;
                    case SupportedHotKeyCategories.Operation:
                        dispatch(sliceActionsDrawingSettings.drawingOperationSelect(parseInt(category.actions[index]) as SupportedOperations));
                        break;
                }
                dispatch(sliceActionsAppHotKeys.toggleHotKey)
            }
        }
    }, [selectedHotKey, initialized, dispatch]);


    useEffect(() => {
        if (!initialized) {
            setInitialized(true);
        }
    }, [initialized]);


    if (!initialized) {

        return <HotKeySetup/>
    }


    return <></>;
}
export default HotKeyDispatcher;
