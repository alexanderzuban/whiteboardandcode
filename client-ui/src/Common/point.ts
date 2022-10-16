import {Nullable} from "./generics";

export interface Point {
    x: number,
    y: number
}

export interface EventPoint {
    x: number,
    y: number,

    altKey: boolean,
    ctrlKey: boolean,
    shiftKey: boolean,
    button: number;
}


export interface Rect {
    topLeft: Point,
    bottomRight: Point
}

export function calcMinMax(...points: Nullable<Point>[]) {
    if (points && points.length > 0) {

        const first = points.find(p => p);
        if (first) {
            const minMax = {
                minX: first.x,
                minY: first.y,
                maxX: first.x,
                maxY: first.y
            }
            points.forEach(p => {
                if (p) {
                    minMax.minX = Math.min(p.x, minMax.minX);
                    minMax.minY = Math.min(p.y, minMax.minY);
                    minMax.maxX = Math.max(p.x, minMax.maxX);
                    minMax.maxY = Math.max(p.y, minMax.maxY);
                }
            });
            return minMax;
        }
    }
    return null;
}

export function movePoint(point: Point, dx: number, dy: number) {
    point.x += dx;
    point.y += dy
}


export function isPointInsideRect(point: Nullable<Point>, rect: Nullable<Rect>): boolean {
    if (!point || !rect) {
        return false;
    }

    if (rect.topLeft.x > point.x || point.x > rect.bottomRight.x) {
        return false;
    }

    if (rect.topLeft.y > point.y || point.y > rect.bottomRight.y) {
        return false;
    }

    return true;
}


export function calcBoundingRectForPointsArray(points: number[]): Nullable<Rect> {
    if (points.length <= 1) {
        return null
    }

    let minX = Number.MAX_VALUE
    let minY = Number.MAX_VALUE
    let maxX = Number.MIN_VALUE
    let maxY = Number.MIN_VALUE
    points.forEach((value, index) => {
        if (index > 0) {
            if (index % 2 !== 0) {
                minX = Math.min(minX, value)
                maxX = Math.max(maxX, value)
            } else {
                minY = Math.min(minY, value)
                maxY = Math.max(maxY, value)
            }
        }
    })


    const topLeft = {
        x: minX,
        y: minY,
    } as Point;

    const bottomRight = {
        x: maxX,
        y: maxY,
    } as Point;

    return {
        topLeft: topLeft,
        bottomRight: bottomRight
    } as Rect

}

export function calcBoundingRect(...points: Nullable<Point>[]): Nullable<Rect> {
    const minMax = calcMinMax(...points);
    if (minMax) {

        const topLeft = {
            x: minMax.minX,
            y: minMax.minY,
        } as Point;

        const bottomRight = {
            x: minMax.maxX,
            y: minMax.maxY,
        } as Point;

        return {
            topLeft: topLeft,
            bottomRight: bottomRight
        } as Rect
    }
    return null;
}
