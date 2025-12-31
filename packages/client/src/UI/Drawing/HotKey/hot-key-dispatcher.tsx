import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import HotKeySetup from "./hot-key-setup";
import {SupportedHotKeyCategories} from "./hotkeys.store";
import {logger} from "../../../Common/debug";
import {sliceActionsDrawingSettings} from "../../../Drawing/Store/drawing-settings.store";
import {SupportedOperations} from "../../../Drawing/Operation/operations";


const HotKeyDispatcher: React.FC = (props) => {

    const [initialized, setInitialized] = useState(false);


    const activeProfile = useSelector((state: AppState) => state.appHotKeys.activeProfile);
    const activeCategory = useSelector((state: AppState) => state.appHotKeys.activeCategory);
    const dispatch = useDispatch();

    logger.log("HotKeyDispatcher", initialized, activeProfile);

    useEffect(() => {
        if (initialized && (activeProfile || activeCategory)) {

            switch (activeCategory) {
                case SupportedHotKeyCategories.Select:
                    dispatch(sliceActionsDrawingSettings.drawingOperationSelect(SupportedOperations.None));
                    break;
                case SupportedHotKeyCategories.Draw:
                    dispatch(sliceActionsDrawingSettings.drawingOperationSelect(SupportedOperations.NewShape));
                    break;
                case SupportedHotKeyCategories.Shape:
                    dispatch(sliceActionsDrawingSettings.drawingOperationSelect(SupportedOperations.NewShape));
                    break;
                case SupportedHotKeyCategories.Line:
                    dispatch(sliceActionsDrawingSettings.drawingOperationSelect(SupportedOperations.NewShape));
                    break;
                case SupportedHotKeyCategories.Text:
                    dispatch(sliceActionsDrawingSettings.drawingOperationSelect(SupportedOperations.NewShape));
                    break;
            }

            if (activeProfile) {
                dispatch(sliceActionsDrawingSettings.drawingProfileSelect(activeProfile))
            }

        }
    }, [activeProfile, activeCategory, initialized, dispatch]);


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
