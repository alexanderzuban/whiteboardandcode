import {DefaultTheme} from "styled-components";
import {NavigationPanel, ToolsPanel} from "./styled";
import {
    ColorCeruleanBlue,
    ColorGainsboro,
    ColorGainsboroDark,
    ColorLightGrey,
    ColorNero,
    ColorRegentStBlue,
    ColorSlateGrey,
    ColorTransparentRegentStBlue,
    ColorWhiteSmoke
} from "../Common/css-colors";

const appTheme: DefaultTheme = {
    settings: {
        hotKeyDelay: 3000
    },

    ui: {
        selectionColor: ColorRegentStBlue,
        selectionFillColor: ColorTransparentRegentStBlue,
        savedFileColor: "blue",
        unsavedFileColor: "red"
    },

    navigationPanel: {
        mainColor: ColorSlateGrey,
        iconSize: 32,
        size: 36,
        borderWidth: 1,
        borderColor: ColorLightGrey,
        borderRadius: 5,
        backgroundColor: ColorWhiteSmoke,
        focusedBackgroundColor: ColorGainsboro,
        selectedBackgroundColor: ColorGainsboroDark,
        selectedMarkerColor: ColorCeruleanBlue,
    } as NavigationPanel,


    toolsPanel: {
        mainColor: ColorSlateGrey,
        iconSize: 24,
        size: 38,
        borderWidth: 1,
        borderColor: ColorLightGrey,
        borderRadius: 5,
        backgroundColor: ColorWhiteSmoke,
        focusedBackgroundColor: ColorGainsboro,
        selectedBackgroundColor: ColorGainsboroDark,
        selectedMarkerColor: ColorCeruleanBlue,
    } as ToolsPanel,

    content: {
        mainColor: ColorNero,
        backgroundColor: ColorWhiteSmoke
    }
};

export {appTheme};
