import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Nullable, withNullable} from "../../../Common/generics";
import {logger} from "../../../Common/debug";


export enum SupportedHotKeyCategories {
    ShapeProfile = "s",
    LineWidth = "w",
    LineColor = "c",
    FillColor = "f",
    Operation = "q",
}

export interface HotKeyCategory {
    name: string,
    tooltip: string,
    icon: IconProp,
    key: SupportedHotKeyCategories,
    actions: string[],
    selectedIndex?: number | undefined
}


export const HotKeyCategories = [
    {
        name: "Current Operation",
        tooltip: "Activate Current Operation\n Press 'q' and next promptly 0-9 to switch active operation",
        icon: ["fal", "file-pen"],
        key: SupportedHotKeyCategories.Operation,
        actions: []
    } as HotKeyCategory,
    {
        name: "Shape Profiles",
        tooltip: "Select active shape profile. Press 's' and next promptly 0-9 to switch between profiles",
        icon: ["fal", "shapes"],
        key: SupportedHotKeyCategories.ShapeProfile,
        actions: []
    } as HotKeyCategory,
    {
        name: "Line Width",
        tooltip: "Select shape line width\n Press 'w' and next promptly 0-9 to switch line width",
        icon: ["fal", "pen-line"],
        key: SupportedHotKeyCategories.LineWidth,
        actions: []
    } as HotKeyCategory,
    {
        name: "Line Color",
        tooltip: "Select shape line color\n Press 'c' and next promptly 0-9 to switch line color",
        icon: ["fal", "palette"],
        key: SupportedHotKeyCategories.LineColor,
        actions: []
    } as HotKeyCategory,
    {
        name: "Fill Color",
        tooltip: "Select shape fill color\n Press 'f' and next promptly 0-9 to switch fill color",
        icon: ["fal", "fill"],
        key: SupportedHotKeyCategories.FillColor,
        actions: []
    } as HotKeyCategory

]

export interface AppHotKeysState {
    readonly categories: HotKeyCategory[]
    readonly toggledCategory: Nullable<SupportedHotKeyCategories>
    readonly toggledKey: string
}

const initialState = {
    categories: HotKeyCategories,
    toggledCategory: null,
    toggledKey: ''
} as AppHotKeysState;


const sliceAppHotKeys = createSlice({
    name: 'appHotKeys',
    initialState,
    reducers: {
        selectActionForEdit(state, action: PayloadAction<{ category: SupportedHotKeyCategories, index: number }>) {
            logger.log("selectActionForEdit", action.payload);

            const selectedCategory = state.categories.find(c => c.key === action.payload.category);
            if (selectedCategory) {
                selectedCategory.selectedIndex = action.payload.index
            }
        },
        registerHotKeyAction(state, action: PayloadAction<{ category: SupportedHotKeyCategories, action: string, index?: number }>) {
            logger.log("registerHotKeyAction", action.payload);

            const selectedCategory = state.categories.find(c => c.key === action.payload.category);
            if (selectedCategory) {
                if (action.payload.index !== undefined) {
                    selectedCategory.actions[action.payload.index] = action.payload.action;
                } else {
                    selectedCategory.actions.push(action.payload.action);
                }
            }
        },
        registerHotKeyCategory(state, action: PayloadAction<HotKeyCategory>) {
            logger.log("toggleHotKeyCategory", action.payload);
            state.categories.push(action.payload);
        },
        toggleHotKeyCategory(state, action: PayloadAction<SupportedHotKeyCategories>) {
            logger.log("toggleHotKeyCategory", action.payload);

            state.toggledCategory = null;
            state.toggledKey = '';

            if (state.categories.find(c => c.key === action.payload)) {
                state.toggledCategory = action.payload;
            }
        },
        toggleHotKey(state, action: PayloadAction<string>) {
            if (state.toggledCategory !== null && action.payload.match('[0-9]')) {
                state.toggledKey = action.payload;
            } else {
                state.toggledCategory = null;
                state.toggledKey = '';
            }

            if (state.toggledCategory && state.toggledKey !== '') {
                withNullable(state.categories.find(c => c.key === state.toggledCategory), c => {
                    c.selectedIndex = Number(state.toggledKey)
                    logger.log(state.toggledCategory, "category", c.key, "selecteIndex", c.selectedIndex, state.toggledKey)
                });
            }

            logger.log("toggleHotKey", {category: state.toggledCategory, key: state.toggledKey});
        }
    },
});


export const sliceActionsAppHotKeys = sliceAppHotKeys.actions;

export default sliceAppHotKeys;
