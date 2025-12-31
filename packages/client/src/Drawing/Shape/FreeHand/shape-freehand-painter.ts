import {ShapeFreehand} from "./shape-freehand";
import DrawigShapePainterBase from "../drawig-shape-painter-base";
import {Point} from "../../../Common/point";
import {getShapeBehavior} from "../shapes";

export class ShapeFreehandPainter extends DrawigShapePainterBase {
    paint(shape: ShapeFreehand, context2d: CanvasRenderingContext2D): void {
        if (shape.start && shape.end) {
            this.startPath(context2d);
            this.setupFromShape(context2d, shape);

            paintBezier(shape, context2d);

            this.fillShape(shape, context2d);
            this.strokeAndRestore(context2d);
        }
    }
}


function paintPointsPath(points: Point[], ctx: CanvasRenderingContext2D) {
    if (points.length < 2) {
        return;
    }

    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
}


function midPointBtw(p1: Point, p2: Point) {
    return {
        x: p1.x + (p2.x - p1.x) / 2,
        y: p1.y + (p2.y - p1.y) / 2
    };
}

function paintBezier(shape: ShapeFreehand, ctx: CanvasRenderingContext2D) {
    const behaviour = getShapeBehavior(shape.type)

    if (behaviour.getPointsCount(shape) < 2) {
        return;
    }

    let p1: Point | undefined;
    let p2: Point | undefined;

    behaviour.iteratePoints(shape, (x, y, index) => {
        if (index === 0) {
            p1 = {x, y}
            ctx.moveTo(p1.x, p1.y);
        } else {
            // we pick the point between pi+1 & pi+2 as the
            // end point and p1 as our control point
            p2 = {x, y}
            let midPoint = midPointBtw(p1!, p2);
            ctx.quadraticCurveTo(p1!.x, p1!.y, midPoint.x, midPoint.y);
            p1 = p2;
        }
    })


    // Draw last line as a straight line while
    // we wait for the next point to be able to calculate
    // the bezier control point
    if (p1) {
        ctx.lineTo(p1.x, p1.y);
    }
}
