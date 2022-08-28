import React, {MouseEvent, TouchEvent, useState} from "react";
import styled from "styled-components";
import DrawingCanvas from "./drawing-canvas";
import {useDispatch, useSelector} from "react-redux";
import appStore, {AppState} from "../Store/App.store";
import {asPoint, touchAsPoint} from "./canvas";
import {SupportedOperations} from "./Operation/operations";
import {Point} from "../Common/point";
import {DocumentType, sliceActionsContent} from "../UI/Content/Store/content.store";
import {logger} from "../Common/debug";
import {DrawingDocument} from "./Store/drawing-document";


const ViewportWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
  display: block
`;


const DrawingView: React.FC = (props) => {
    logger.render("DrawingView")

    const settings = useSelector((state: AppState) => state.drawingSettings);
    const dispatch = useDispatch();
    const [touchPoint, setTouchPoint] = useState({x: 0, y: 0} as Point);

    //we need to listen to entire content here
    const content = useSelector((state: AppState) => state.content);
    const file = content.files[content.selectedIndex];


    if (file.type !== DocumentType.Drawing) {
        return <></>
    }
    const drawing = file as DrawingDocument

    function processStart(point: Point, event: { ctrlKey: boolean, altKey: boolean, shiftKey: boolean }) {
        if (!drawing) return;

        if (drawing.operation) {
            dispatch(sliceActionsContent.drawingOperationResume({
                data: point,
                settings: appStore.getState().drawingSettings
            }))
            return;
        }

        function startOperation(operation: SupportedOperations) {
            dispatch(sliceActionsContent.drawingOperationStart({
                operation,
                data: point,
                settings: appStore.getState().drawingSettings
            }));
        }


        if (event.ctrlKey) {
            const ctrlOperation = drawing.selectedShapes.keys.length === 0
                ? SupportedOperations.Pan : SupportedOperations.Translate;

            startOperation(ctrlOperation);
            return;
        }

        if (event.altKey) {
            startOperation(SupportedOperations.NewShape);
            return;
        }

        if (event.shiftKey) {
            //start and resume select operation, to avoid reset current selection
            startOperation(SupportedOperations.Select)
            dispatch(sliceActionsContent.drawingOperationResume({
                data: point,
                settings: appStore.getState().drawingSettings
            }))
            return;
        }

        if (settings.selectedOperation) {
            startOperation(settings.selectedOperation);
        }
    }

    function mouseDown(event: MouseEvent<HTMLDivElement>) {
        if (!drawing) return;

        const point = asPoint(drawing.origin, event);

        logger.log("mouseDown", point, drawing?.operation, settings.selectedOperation)
        processStart(point, event)
    }

    function mouseMove(event: MouseEvent<HTMLDivElement>) {
        if (!drawing || !drawing.operation) return;
        const point = asPoint(drawing.origin, event);

        dispatch(sliceActionsContent.drawingOperationUpdate({
            settings: appStore.getState().drawingSettings,
            data: point
        }));
    }

    function mouseUp(event: MouseEvent<HTMLDivElement>) {
        if (!drawing || !drawing.operation) return;
        const point = asPoint(drawing.origin, event);

        logger.log("mouseUp", point)
        dispatch(sliceActionsContent.drawingOperationComplete({
            settings: appStore.getState().drawingSettings,
            data: point
        }));
    }

    function click(event: MouseEvent<HTMLDivElement>) {
        if (!drawing) return;
        const point = asPoint(drawing.origin, event);
        logger.log("click", point)
    }

    function touchStart(event: TouchEvent<HTMLElement>) {
        if (!drawing) return;
        const point = touchAsPoint(drawing.origin, event);
        logger.log("touchStart", point)
        setTouchPoint(point)
        processStart(point, event)
    }

    function touchMove(event: TouchEvent<HTMLElement>) {
        if (!drawing) return;
        const point = touchAsPoint(drawing.origin, event);
        setTouchPoint(point)
        dispatch(sliceActionsContent.drawingOperationUpdate({
            settings: appStore.getState().drawingSettings,
            data: point
        }));
    }

    function touchEnd(event: TouchEvent<HTMLElement>) {
        logger.log("touchEnd", touchPoint)
        dispatch(sliceActionsContent.drawingOperationComplete({
            settings: appStore.getState().drawingSettings,
            data: touchPoint
        }));
    }


    function touchCancel(event: TouchEvent<HTMLElement>) {
        logger.log("touchCancel", touchPoint)
        dispatch(sliceActionsContent.drawingOperationComplete({
            settings: appStore.getState().drawingSettings,
            data: touchPoint
        }));
    }

    return <ViewportWrapper
        onMouseDown={mouseDown} //
        onMouseMove={mouseMove} //
        onMouseUp={mouseUp}
        onClick={click}>
        <DrawingCanvas
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
            onTouchMove={touchMove}
            onTouchCancel={touchCancel}/>
    </ViewportWrapper>;
}

export default DrawingView;
