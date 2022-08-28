import React from "react";
import {HotKeyCategory, SupportedHotKeyCategories} from "./hotkeys.store";
import HotKeyColorIconPainter from "./IconPainter/hot-key-color-icon-painter";
import HotKeyLineWidthIconPainter from "./IconPainter/hot-key-line-width-icon-painter";
import HotKeyShapeIconPainter from "./IconPainter/hot-key-shape-icon-painter";
import HotKeyOperationIconPainter from "./IconPainter/hot-key-operation-painter";
import {useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import {logger} from "../../../Common/debug";

interface HotKeyCategoryActionIconSelectorProps {
    category: HotKeyCategory
    action: string
    index: number
    shapeProfile?: boolean
    children?: any
}


const HotKeyCategoryActionIconSelector: React.FC<HotKeyCategoryActionIconSelectorProps> = (props) => {
    logger.render("HotKeyCategoryActionIconSelector");
    const key = props.category.key + "-" + props.index + "-" + props.shapeProfile
    const settings = useSelector((state: AppState) => state.drawingSettings.newShapeSettings)
    const profile = settings.profiles[settings.selectedProfileIndex];

    switch (props.category.key) {
        case SupportedHotKeyCategories.FillColor:
            return <HotKeyColorIconPainter
                category={props.category}
                action={(props.shapeProfile && profile.fillColor) ? profile.fillColor : props.action}
                key={key}
                iconOnly={props.shapeProfile}
                index={props.index}/>
        case SupportedHotKeyCategories.LineColor:
            return <HotKeyColorIconPainter
                category={props.category}
                action={(props.shapeProfile && profile.lineColor) ? profile.lineColor : props.action}
                key={key}
                iconOnly={props.shapeProfile}
                index={props.index}/>
        case SupportedHotKeyCategories.LineWidth:
            return <HotKeyLineWidthIconPainter
                category={props.category}
                action={(props.shapeProfile && profile.lineWidth) ? `${profile.lineWidth}` : props.action}
                key={key}
                iconOnly={props.shapeProfile}
                index={props.index}/>
        case SupportedHotKeyCategories.ShapeProfile:
            return <HotKeyShapeIconPainter
                category={props.category}
                action={props.action}
                key={key}
                iconOnly={props.shapeProfile}
                index={props.index}/>
        case SupportedHotKeyCategories.Operation:
            return <HotKeyOperationIconPainter
                category={props.category}
                action={props.action}
                key={key}
                iconOnly={props.shapeProfile}
                index={props.index}/>

    }

    return <>
    </>;
}

export default HotKeyCategoryActionIconSelector;
