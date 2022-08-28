import React, {TouchEventHandler, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {AppState} from "../Store/App.store";
import {withNullable} from "../Common/generics";
import {getContext2D} from "./canvas";
import styled, {DefaultTheme} from "styled-components";
import {DrawingContext, DrawingShape, getShapeBehavior} from "./Shape/shapes";
import Background from "./Painter/background";
import getOperationHandler from "./Operation/operations";
import Selection from "./Painter/selection";
import {CssCursors} from "../Common/css-cursors";
import {currentDrawingDocument} from "../UI/Content/Store/content.store.common";
import {logger} from "../Common/debug";

interface CanvasWrapperProps {
    readonly width: number;
    readonly height: number;
    readonly cursor: CssCursors;
    readonly theme: DefaultTheme;
    readonly  children?: any;
}

const CanvasWrapper = styled.canvas<CanvasWrapperProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  cursor: ${props => props.cursor}
`;

interface DrawingCanvasProps {
    onTouchStart?: TouchEventHandler,
    onTouchEnd?: TouchEventHandler,
    onTouchMove?: TouchEventHandler,
    onTouchCancel?: TouchEventHandler,
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = (props) => {
    logger.render("DrawingCanvas")
    const size = useSelector((state: AppState) => state.appView.contentSize);
    const content = useSelector((state: AppState) => state.content);
    const settings = useSelector((state: AppState) => state.drawingSettings);
    const canvasElement = useRef<HTMLCanvasElement>(null);
    const document = currentDrawingDocument(content)

    useEffect(() => {
        function paint(ctx: CanvasRenderingContext2D) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.save();
            if (document) {
                const context = {document, settings} as DrawingContext
                new Background().paint(context, ctx);

                //back origin to 0
                ctx.translate(-document.origin.x, -document.origin.y);

                const selectedShapes: DrawingShape[] = []
                const selectedShapesKeys = new Set<number>(document.selectedShapes.keys)
                document.shapes.forEach(shape => {
                    withNullable(getShapeBehavior(shape.type), behavior => {
                        behavior.getPainter().paint(shape, ctx);

                        if (selectedShapesKeys.has(shape.key)) {
                            selectedShapes.push(shape);
                        }
                    });
                });

                selectedShapes.forEach(shape => {
                    new Selection().paint(shape.boundingRect, ctx);
                });

                new Selection().paint(document.selectedShapes.boundingRect, ctx);

                if (document.operation) {
                    const painter = getOperationHandler(document.operation?.type)?.getPainter();
                    if (painter) {
                        painter.paint(document.operation, context, ctx);
                    }
                }
            }
            ctx.restore();
        }

        withNullable(getContext2D(canvasElement.current), paint)
    }, [size, document, settings])


    return <CanvasWrapper
        width={size.width}
        height={size.height}
        cursor={content.drawingCursor}
        ref={canvasElement}
        onTouchStart={props.onTouchStart}
        onTouchEnd={props.onTouchEnd}
        onTouchMove={props.onTouchMove}
        onTouchCancel={props.onTouchCancel}
    />;
}

export default DrawingCanvas;


