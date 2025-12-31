import React, {useMemo} from "react";
import useEventListener from "@use-it/event-listener";
import {useDispatch, useSelector} from "react-redux";
import appStore, {AppState} from "../../Store/App.store";
import {sliceActionsAppHotKeys, SupportedHotKeyCategories} from "./HotKey/hotkeys.store";
import {sliceActionsContent} from "../Content/Store/content.store";
import {logger} from "../../Common/debug";


const DrawingKeyboardListener: React.FC = () => {
    logger.render("DrawingKeyboardListener");

    const categories = useSelector((state: AppState) => state.appHotKeys.categories);

    const dispatch = useDispatch();

    const categoryLookup = useMemo(() => {
        const categoryLookup = new Map<String, SupportedHotKeyCategories>();
        categories.forEach(c => categoryLookup.set(c.key.toString(), c.key));
        return categoryLookup;
    }, [categories])

    useEventListener('keydown', (e: KeyboardEvent) => {
        logger.log(`Pressed Key ${e.key}`)

        const category = categoryLookup.get(e.key)
        if (category !== undefined) {
            dispatch(sliceActionsAppHotKeys.toggleHotKeyCategory(category));
            return;
        }

        if (e.key.match('[0-9]')) {
            dispatch(sliceActionsAppHotKeys.toggleHotKeyProfile(e.key));
            return;
        }

        if (e.ctrlKey) {
            if (e.key === 'a' || e.key === 'A') {
                dispatch(sliceActionsContent.drawingSelectAll());
                return;
            }
        }

        const dd = e.shiftKey ? 1 : 10;
        switch (e.key) {
            case "ArrowUp":
                dispatch(sliceActionsContent.drawingSelectedTranslate({dx: 0, dy: -dd}));
                break;
            case "ArrowLeft":
                dispatch(sliceActionsContent.drawingSelectedTranslate({dx: -dd, dy: 0}));
                break;
            case "ArrowRight":
                dispatch(sliceActionsContent.drawingSelectedTranslate({dx: dd, dy: 0}));
                break;
            case "ArrowDown":
                dispatch(sliceActionsContent.drawingSelectedTranslate({dx: 0, dy: dd}));
                break;
            case "Delete":
                dispatch(sliceActionsContent.drawingSelectedDelete());
                break;
            case "Enter":
                dispatch(sliceActionsContent.drawingOperationEnd({
                    settings: appStore.getState().drawingSettings
                }));
                break;
            case "Escape":
                dispatch(sliceActionsContent.drawingOperationCancel({
                    settings: appStore.getState().drawingSettings
                }));
                break;
        }
    });

    return (<></>);
}

export default DrawingKeyboardListener;

