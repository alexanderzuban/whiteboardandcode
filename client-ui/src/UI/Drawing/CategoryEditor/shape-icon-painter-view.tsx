import React, {useEffect, useRef} from "react";
import {logger} from "../../../Common/debug";
import {useTheme} from "styled-components";
import {withNullable} from "../../../Common/generics";
import {getContext2D} from "../canvas";
import {DrawingShapeStyle, getShapeBehavior, SupportedShapes} from "../../../Drawing/Shape/shapes";

export interface ShapeIconPainterViewProps {
    shape: SupportedShapes,
    style: DrawingShapeStyle
}

const ShapeIconPainterView: React.FC<ShapeIconPainterViewProps> = (props) => {
    logger.render("ShapeIconPainerView")
    const canvasElement = useRef<HTMLCanvasElement>(null);
    const theme = useTheme();


    useEffect(() => {
        function paint(ctx: CanvasRenderingContext2D) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


            const shapeBehavior = getShapeBehavior(props.shape);
            const shape = shapeBehavior?.demoInstance(theme.navigationPanel.size, props);

            if (shape) {
                shapeBehavior?.getPainter().paint(shape, ctx);
            }
        }

        withNullable(getContext2D(canvasElement.current), paint)
    }, [props, theme])
 
    return <canvas
        ref={canvasElement}
        width={theme.toolsPanel.size - 2}
        height={theme.toolsPanel.size - 2}/>;


}

export default ShapeIconPainterView;
