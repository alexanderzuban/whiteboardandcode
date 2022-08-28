import {DrawingContext, DrawingContextDocument, DrawingShapePainter, SupportedShapes} from "../shapes";
import {Point} from "../../../Common/point";
import {ShapeFreehand} from "./shape-freehand";
import DrawingShapeBehaviorBase from "../drawing-shape-behavior-base";
import {ShapeFreehandPainter} from "./shape-freehand-painter";
import NewShapeProfile from "../../Operation/NewShape/operation-new-shape-profile";
import {Nullable} from "../../../Common/generics";

export class ShapeFreehandBehavior extends DrawingShapeBehaviorBase {
    getPainter(): DrawingShapePainter {
        return new ShapeFreehandPainter();
    }

    newInstance(context: DrawingContext, start: Point): ShapeFreehand {
        const shape = this.initialShape(context, start, SupportedShapes.Freehand, "Freehand") as ShapeFreehand;
        this.pushPoint(shape, start)

        return shape;
    }

    extendTo(shape: ShapeFreehand, context: Nullable<DrawingContext>, point: Point): ShapeFreehand {
        if (!shape.start) {
            shape.start = point;
        }
        this.pushPoint(shape, point)
        shape.end = point;
        this.updateBoundingRect(shape, false);

        return shape;
    }

    complete(shape: ShapeFreehand, context: Nullable<DrawingContextDocument>, point: Point, force: boolean): boolean {
        this.pushPoint(shape, point)
        shape.end = point;
        this.updateBoundingRect(shape, true);

        return super.complete(shape, context, point, force);
    }

    demoInstance(size: number, profile?: NewShapeProfile): ShapeFreehand {
        const start = {x: 2, y: size / 2};
        const shape =
            this.demoShape(start, SupportedShapes.Freehand, "Freehand", profile) as ShapeFreehand;

        this.extendTo(shape, null, {x: size / 3, y: size / 4 * 3});
        this.extendTo(shape, null, {x: size / 3 * 2, y: size / 4});
        this.complete(shape, null, {x: size - 4, y: size / 2}, true)

        return shape;
    }
}
