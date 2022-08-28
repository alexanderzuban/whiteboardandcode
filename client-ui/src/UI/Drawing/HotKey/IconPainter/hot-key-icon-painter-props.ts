import {HotKeyCategory} from "../hotkeys.store";
import {ReactNode} from "react";

export interface HotKeyIconPainterProps {
    category: HotKeyCategory
    action: string
    index: number
    iconOnly?: boolean
    tooltip?: string | ReactNode
    children?: any
}
