import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import NewShapeProfile from "../Operation/NewShape/operation-new-shape-profile";
import {getShapeBehavior, SupportedShapes} from "../Shape/shapes";
import {DrawingSettings} from "./drawing-settings.store";


export interface DrawingNewShapeSettings {
    selectedProfileIndex: number,
    counter: number
    readonly  profiles: NewShapeProfile[]


    shape?: SupportedShapes,
    fillColor?: string,
    fillStyle?: string,
    lineWidth?: number,
    lineColor?: string,
    lineType?: string
}


export function initialStateNewShapeSettings() {
    const shapes = [
        SupportedShapes.Rect,
        SupportedShapes.Rect,
        SupportedShapes.Line,
        SupportedShapes.Circle,
        SupportedShapes.Polyline,
        SupportedShapes.Freehand,
        SupportedShapes.Rect,
        SupportedShapes.Rect,
        SupportedShapes.Rect,
        SupportedShapes.Rect];

    const settings = {
        counter: 1,
        profiles: [],
        selectedProfileIndex: -1
    } as DrawingNewShapeSettings;

    shapes.forEach(s => {
        const behaviour = getShapeBehavior(s)
        if (behaviour) {
            const demo = behaviour.demoInstance(24)
            inDispatchNewShape.registerProfile(settings, behaviour.shapeProfile(demo));
            return
        }
        return null
    });

    return settings;
}


class DrawingNewShapeSettingsInDispatch {
    selectProfile(state: DrawingNewShapeSettings, key: number) {

        state.profiles.find((p, index) => {
            if (p.key === key) {
                state.selectedProfileIndex = index

                state.shape = p.shape;
                state.fillColor = p.fillColor;
                state.fillStyle = p.fillStyle;
                state.lineWidth = p.lineWidth;
                state.lineColor = p.lineColor;
                state.lineType = p.lineType;
                return true
            }
            return false;
        })
    }

    registerProfile(state: DrawingNewShapeSettings, profile: NewShapeProfile) {
        profile.key = state.counter;
        state.counter++;
        state.profiles.push(profile);

        if (state.selectedProfileIndex < 0) {
            this.selectProfile(state, state.profiles.length - 1)
        }
    }

    private withProfile(state: DrawingNewShapeSettings, action: (profile: NewShapeProfile) => void) {
        const index = state.selectedProfileIndex
        if (index >= 0 && state.profiles.length > index) {
            action(state.profiles[index])
        }
    }

    setCurrentProfileFillColor(state: DrawingNewShapeSettings, fillColor: string) {
        state.fillColor = fillColor;
        this.withProfile(state, p => {
            p.fillColor = fillColor
        })
    }

    setCurrentProfileFillStyle(state: DrawingNewShapeSettings, fillStyle: string) {
        state.fillStyle = fillStyle;
        this.withProfile(state, p => {
            p.fillStyle = fillStyle
        })
    }

    setCurrentProfileLineWidth(state: DrawingNewShapeSettings, lineWidth: number) {
        state.lineWidth = lineWidth;
        this.withProfile(state, p => {
            p.lineWidth = lineWidth
        })
    }

    setCurrentProfileLineColor(state: DrawingNewShapeSettings, lineColor: string) {
        state.lineColor = lineColor;
        this.withProfile(state, p => {
            p.lineColor = lineColor
        })
    }

    setCurrentProfileLineType(state: DrawingNewShapeSettings, lineType: string) {
        state.lineType = lineType;
        this.withProfile(state, p => {
            p.lineType = lineType
        })
    }
}

export const inDispatchNewShape = new DrawingNewShapeSettingsInDispatch();


export const newShapeRegisterProfile: CaseReducer<DrawingSettings, PayloadAction<NewShapeProfile>>
    = function (state, action) {
    inDispatchNewShape.registerProfile(state.newShapeSettings, action.payload)
}

export const newShapeSelectProfile: CaseReducer<DrawingSettings, PayloadAction<number>>
    = function (state, action) {
    inDispatchNewShape.selectProfile(state.newShapeSettings, action.payload)
}

export const newShapeSelectFillColor: CaseReducer<DrawingSettings, PayloadAction<string>>
    = function (state, action) {
    inDispatchNewShape.setCurrentProfileFillColor(state.newShapeSettings, action.payload)
}

export const newShapeSelectFillStyle: CaseReducer<DrawingSettings, PayloadAction<string>>
    = function (state, action) {
    inDispatchNewShape.setCurrentProfileFillStyle(state.newShapeSettings, action.payload)
}

export const newShapeSelectLineWidth: CaseReducer<DrawingSettings, PayloadAction<number>>
    = function (state, action) {
    inDispatchNewShape.setCurrentProfileLineWidth(state.newShapeSettings, action.payload)
}
export const newShapeSelectLineColor: CaseReducer<DrawingSettings, PayloadAction<string>>
    = function (state, action) {
    inDispatchNewShape.setCurrentProfileLineColor(state.newShapeSettings, action.payload)
}

export const newShapeSelectLineType: CaseReducer<DrawingSettings, PayloadAction<string>>
    = function (state, action) {
    inDispatchNewShape.setCurrentProfileLineType(state.newShapeSettings, action.payload)
}
