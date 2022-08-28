import React, {useEffect, useRef} from "react";
import HotKeyCellPainter from "./hot-key-cell-painter";
import {HotKeyIconPainterProps} from "./hot-key-icon-painter-props";
import {useTheme} from "styled-components";
import {withNullable} from "../../../../Common/generics";
import {getContext2D} from "../../../../Drawing/canvas";
import {getShapeBehavior} from "../../../../Drawing/Shape/shapes";
import {useSelector} from "react-redux";
import {AppState} from "../../../../Store/App.store";
import {logger} from "../../../../Common/debug";


const HotKeyShapeIconPainter: React.FC<HotKeyIconPainterProps> = (props) => {
    logger.render("HotKeyShapeIconPainter");

    const canvasElement = useRef<HTMLCanvasElement>(null);
    const theme = useTheme();
    const profiles = useSelector((store: AppState) => store.drawingSettings.newShapeSettings.profiles)
    const profile = profiles.find(p => p.key === Number(props.action))


    useEffect(() => {
        function paint(ctx: CanvasRenderingContext2D) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            if (profile) {
                const shapeBehavior = getShapeBehavior(profile.shape);
                const shape = shapeBehavior?.demoInstance(theme.navigationPanel.size, profile);

                if (shape) {
                    shapeBehavior?.getPainter().paint(shape, ctx);
                }
            }
        }

        withNullable(getContext2D(canvasElement.current), paint)
    }, [props.category, props.action, props.index, theme.navigationPanel.size, profile])


    if (profile) {
        const shapeBehavior = getShapeBehavior(profile.shape);
        const shape = shapeBehavior?.demoInstance(theme.navigationPanel.size);


        return <HotKeyCellPainter
            category={props.category}
            action={props.action}
            index={props.index}
            tooltip={`Hot Key [${props.index}]: ${profile?.name ?? shape?.name}`}
            iconOnly={props.iconOnly}>
            <canvas ref={canvasElement} width={theme.navigationPanel.size - 1} height={theme.navigationPanel.size - 1}/>
        </HotKeyCellPainter>;
    }
    return <></>

}
export default HotKeyShapeIconPainter;
