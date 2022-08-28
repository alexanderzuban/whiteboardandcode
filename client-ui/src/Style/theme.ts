import {DefaultTheme} from "styled-components";
import {NavigationPanel} from "./styled";

const appTheme: DefaultTheme = {
    settings: {
        hotKeyDelay: 3000
    },

    ui: {
        selectionColor: "rgba(168,208,222,1)",
        selectionFillColor: "rgba(168,208,222,0.3)",
        savedFileColor: "blue",
        unsavedFileColor: "red"
    },

    navigationPanel: {
        mainColor: "slategray",
        iconSize: 32,
        size: 36,
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 5,
        backgroundColor: "#EBEBEB",
        focusedBackgroundColor: "#E2E2E2",
        selectedBackgroundColor: "#D9D9D9",
        selectedMarkerColor: "#2770CB",
    } as NavigationPanel,

    content: {
        mainColor: "#000",
        backgroundColor: "#F8F8F8"
    }
};

export {appTheme};
