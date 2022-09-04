import {Nullable} from "../Common/generics";
import {MouseEvent, TouchEvent} from "react";
import {Point} from "../Common/point";

export function getContext2D(element: HTMLCanvasElement | null): Nullable<CanvasRenderingContext2D> {
    if (element) {
        return element.getContext("2d")
    }
    return null
}

export function asPoint(origin: Point, event: MouseEvent<any>): Point {
    return {
        x: event.nativeEvent.offsetX + origin.x,
        y: event.nativeEvent.offsetY + origin.y
    } as Point;
}

export function touchAsPoint(origin: Point, event: TouchEvent<HTMLElement>): Point {
    let offsetTop = 0;
    let offsetLeft = 0;
    let target = event.nativeEvent.target as  HTMLElement;

    while (target !== null && target !== undefined){
        offsetTop+= target.offsetTop;
        offsetLeft+= target.offsetLeft;
        target = target.offsetParent as HTMLElement;
    }


    return {
        x: event.nativeEvent.touches[0].clientX + origin.x - offsetLeft,
        y: event.nativeEvent.touches[0].clientY + origin.y - offsetTop
    } as Point;
}
