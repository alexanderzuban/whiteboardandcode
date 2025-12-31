// import original module declarations
import 'styled-components';
import {DefaultTheme, ThemedStyledInterface} from "styled-components";

export interface NavigationPanel {
    mainColor: string;
    iconSize: number;
    size: number;
    backgroundColor: string;
    borderWidth: number;
    borderRadius: number;
    borderColor: string;

    focusedBackgroundColor: string;
    selectedBackgroundColor: string;
    selectedMarkerColor: string;
}

export interface ToolsPanel {
    mainColor: string;
    iconSize: number;
    size: number;
    backgroundColor: string;
    borderWidth: number;
    borderRadius: number;
    borderColor: string;

    focusedBackgroundColor: string;
    selectedBackgroundColor: string;
    selectedMarkerColor: string;
}

// and extend them!
declare module 'styled-components' {

    export interface DefaultTheme {
        settings: {
            hotKeyDelay: number
        }
        ui: {
            selectionColor: string
            selectionFillColor: string
            savedFileColor: string
            unsavedFileColor: string
        }
        navigationPanel: NavigationPanel;
        toolsPanel: ToolsPanel;

        content: {
            mainColor: string
            backgroundColor: string
        };
    }
}


export interface StyledComponentProps {
    readonly children?: any;
    readonly theme?: ThemedStyledInterface<DefaultTheme>;
    readonly borders?: boolean;
    readonly className?: string;
}


