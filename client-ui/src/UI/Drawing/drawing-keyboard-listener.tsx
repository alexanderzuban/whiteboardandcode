import React, {useEffect, useMemo, useState} from "react";
import useEventListener from "@use-it/event-listener";
import {useDispatch, useSelector} from "react-redux";
import appStore, {AppState} from "../../Store/App.store";
import {useTheme} from "styled-components";
import {sliceActionsAppHotKeys, SupportedHotKeyCategories} from "./HotKey/hotkeys.store";
import {sliceActionsContent} from "../Content/Store/content.store";
import {logger} from "../../Common/debug";

interface AppKeyboardState {
    readonly  category: string
}

const emptyKeyboardState = {category: ''} as AppKeyboardState;

const DrawingKeyboardListener: React.FC = () => {
    logger.render("DrawingKeyboardListener");

    const [keyboardState, setKeyboardState] = useState(emptyKeyboardState);
    const categories = useSelector((state: AppState) => state.appHotKeys.categories);

    const dispatch = useDispatch();
    const theme = useTheme();

    const categoryLookup = useMemo(() => {
        const categoryLookup = new Map<String, SupportedHotKeyCategories>();
        categories.forEach(c => categoryLookup.set(c.key.toString(), c.key));
        return categoryLookup;
    }, [categories])

    useEventListener('keydown', (e: KeyboardEvent) => {
        logger.log(`Pressed Key ${e.key}`)

        const category = categoryLookup.get(e.key)
        if (category !== undefined) {
            setKeyboardState({
                category: e.key
            });
            dispatch(sliceActionsAppHotKeys.toggleHotKeyCategory(category));
            return;
        }

        if (keyboardState.category !== '' && e.key.match('[0-9]')) {
            setKeyboardState(emptyKeyboardState);
            dispatch(sliceActionsAppHotKeys.toggleHotKey(e.key));
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

    useEffect(() => {
        const timer = keyboardState.category !== '' ? setTimeout(() => {
                //reset keyboard after inactivity period
                setKeyboardState(emptyKeyboardState);
            }, theme.settings.hotKeyDelay)
            : null;
        logger.log("timer", timer)
        return () => {
            timer && clearTimeout(timer)
        };
    }, [keyboardState, theme]);

    return (<></>);
}

export default DrawingKeyboardListener;

