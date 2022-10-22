import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Nullable} from "../../../Common/generics";
import {logger} from "../../../Common/debug";
import {DrawingProfile} from "../../../Drawing/Profile/profile";


export enum SupportedHotKeyCategories {
    Select = "a",
    Draw = "d",
    Shape = "s",
    Line = "l",
    Text = "t"
}

export interface HotKeyCategory {
    name: string,
    tooltip: string,
    icon: IconProp,
    key: SupportedHotKeyCategories,
    profiles: string[],
    selectedProfile: Nullable<string>
}


export const HotKeyCategories = [
    {
        name: "Selection",
        tooltip: "Selection ('a')",
        icon: ["fal", "arrow-pointer"],
        key: SupportedHotKeyCategories.Select,
        profiles: [],
        selectedProfile: null
    } as HotKeyCategory,
    {
        name: "Draw",
        tooltip: "Draw ('d')\n use 0-9 to switch between drawing modes",
        icon: ["fal", "pen-line"],
        key: SupportedHotKeyCategories.Draw,
        profiles: [],
        selectedProfile: null
    } as HotKeyCategory,
    {
        name: "Shape",
        tooltip: "Shape ('s')\n use 0-9 to switch between shape profiles",
        icon: ["fal", "shapes"],
        key: SupportedHotKeyCategories.Shape,
        profiles: [],
        selectedProfile: null
    } as HotKeyCategory,
    {
        name: "Line",
        tooltip: "Line ('l')\n use 0-9 to switch between line profiles",
        icon: ["fal", "arrow-right"],
        key: SupportedHotKeyCategories.Line,
        profiles: [],
        selectedProfile: null
    } as HotKeyCategory,
    {
        name: "Text",
        tooltip: "Text ('t')",
        icon: ["fal", "text"],
        key: SupportedHotKeyCategories.Text,
        profiles: [],
        selectedProfile: null
    } as HotKeyCategory
]

export interface AppHotKeysState {
    readonly categories: HotKeyCategory[]
    activeCategory: Nullable<SupportedHotKeyCategories>
    activeProfile: Nullable<string>
}

const initialState = {
    categories: HotKeyCategories,
    activeCategory: null,
    activeProfile: null
} as AppHotKeysState;


const sliceAppHotKeys = createSlice({
    name: 'appHotKeys',
    initialState,
    reducers: {
        registerHotKeyCategory(state, action: PayloadAction<HotKeyCategory>) {
            logger.log("registerHotKeyCategory", action.payload);
            state.categories.push(action.payload);
        },
        registerHotKeyProfile(state, action: PayloadAction<{ category: SupportedHotKeyCategories, profile: DrawingProfile, index?: number }>) {
            logger.log("registerHotKeyProfile", action.payload);

            const selectedCategory = state.categories.find(c => c.key === action.payload.category);
            if (selectedCategory) {
                if (selectedCategory.profiles === undefined) {
                    selectedCategory.profiles = [];
                }
                if (action.payload.index !== undefined) {
                    selectedCategory.profiles[action.payload.index] = action.payload.profile.uid
                } else {
                    selectedCategory.profiles.push(action.payload.profile.uid)
                }
            }
        },
        toggleHotKeyCategory(state, action: PayloadAction<SupportedHotKeyCategories>) {
            logger.log("toggleHotKeyCategory", action.payload);
            if (state.activeCategory === action.payload) {
                return
            }

            state.activeCategory = null
            state.activeProfile = null
            const category = state.categories.find(c => c.key === action.payload)

            if (category) {
                state.activeCategory = action.payload;
                if (category.selectedProfile) {
                    state.activeProfile = category.selectedProfile
                } else {
                    if (category.profiles && category.profiles.length > 0) {
                        state.activeProfile = category.profiles[0]
                        category.selectedProfile = state.activeProfile;
                    }
                }
            }
        },
        toggleHotKeyProfile(state, action: PayloadAction<string>) {
            logger.log("toggleHotKeyProfile", action.payload, state.activeCategory);
            if (state.activeCategory !== null) {
                const category = state.categories.find(c => c.key === state.activeCategory)
                let profile: Nullable<string>

                if (category && category.profiles) {
                    profile = category.profiles.find(p => p === action.payload)
                }

                if (!profile && action.payload.match('[0-9]')) {
                    let selectedIndex = Number(action.payload)
                    if (selectedIndex === 0) {
                        selectedIndex = 10;
                    } else {
                        selectedIndex--;
                    }

                    if (category && category.profiles && category.profiles.length > selectedIndex) {
                        profile = category.profiles[selectedIndex]
                    }
                }

                if (profile && category) {
                    state.activeProfile = profile
                    category.selectedProfile = profile
                }
            } else {
                state.activeCategory = null
                state.activeProfile = null
            }
        }
    },
});


export const sliceActionsAppHotKeys = sliceAppHotKeys.actions;

export default sliceAppHotKeys;
