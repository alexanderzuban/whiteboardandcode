import {ShapePolyline} from "./shape-polyline";
import DrawigShapePainterBase from "../drawig-shape-painter-base";
import {getShapeBehavior} from "../shapes";

export class ShapePolylinePainter extends DrawigShapePainterBase {
    paint(shape: ShapePolyline, context2d: CanvasRenderingContext2D): void {
        const behaviour = getShapeBehavior(shape.type);
        const pointsCount = behaviour.getPointsCount(shape)
        if (pointsCount === 0) {
            return
        }

        this.startPath(context2d);
        this.setupFromShape(context2d, shape);

        const start = behaviour.getPointAt(shape, 0);
        context2d.moveTo(start.x, start.y);

        for (let index = 1; index < pointsCount; index++) {
            const end = behaviour.getPointAt(shape, index);
            context2d.lineTo(end.x, end.y);
        }

        this.fillShape(shape, context2d);
        this.strokeAndRestore(context2d);
    }

}
