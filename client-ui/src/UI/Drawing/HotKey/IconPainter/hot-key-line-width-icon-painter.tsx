import React, {useEffect, useRef} from "react";
import HotKeyCellPainter from "./hot-key-cell-painter";
import {HotKeyIconPainterProps} from "./hot-key-icon-painter-props";
import {withNullable} from "../../../../Common/generics";
import {getContext2D} from "../../../../Drawing/canvas";
import {useTheme} from "styled-components";
import {logger} from "../../../../Common/debug";

const HotKeyLineWidthIconPainter: React.FC<HotKeyIconPainterProps> = (props) => {
    logger.render("HotKeyLineWidthIconPainter");

    const canvasElement = useRef<HTMLCanvasElement>(null);
    const theme = useTheme();

    useEffect(() => {
        function paint(ctx: CanvasRenderingContext2D) {
            ctx.save()
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.lineWidth = Number(props.action);
            ctx.strokeStyle = "black";

            ctx.translate(0.5, 0.5);
            ctx.moveTo(0, 0);
            ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
            ctx.stroke();
            ctx.restore()
        }

        withNullable(getContext2D(canvasElement.current), paint)
    }, [props.category, props.action, props.index])

    return <HotKeyCellPainter
        category={props.category} action={props.action} index={props.index} iconOnly={props.iconOnly}>
        <canvas ref={canvasElement} width={theme.navigationPanel.size - 1} height={theme.navigationPanel.size - 1}/>
    </HotKeyCellPainter>;
}
export default HotKeyLineWidthIconPainter;
