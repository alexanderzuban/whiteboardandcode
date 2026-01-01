import {OperationHover} from "./operation-hover";
import {Painter} from "../operations";
import {DrawingContext} from "../../Shape/shapes";
import {appTheme} from "../../../Style/theme";

/**
 * Draws a rounded rectangle path (cross-browser compatible)
 */
function drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
): void {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
}

export class OperationHoverPainter implements Painter {
    paint(operation: OperationHover, context: DrawingContext, context2d: CanvasRenderingContext2D): void {
        if (!operation || !operation.currentShape || !operation.currentShape.boundingRect) {
            return;
        }

        const shape = operation.currentShape;
        const rect = shape.boundingRect;

        if (!rect.topLeft || !rect.bottomRight) {
            return;
        }

        // Draw hover highlight around the shape
        context2d.save();
        context2d.beginPath();
        context2d.translate(0.5, 0.5);

        // Draw a subtle glow effect
        const padding = 4;
        const x = rect.topLeft.x - padding;
        const y = rect.topLeft.y - padding;
        const width = rect.bottomRight.x - rect.topLeft.x + padding * 2;
        const height = rect.bottomRight.y - rect.topLeft.y + padding * 2;

        // Outer glow with rounded corners (cross-browser compatible)
        context2d.strokeStyle = appTheme.ui.selectionColor;
        context2d.lineWidth = 2;
        context2d.globalAlpha = 0.5;
        context2d.setLineDash([]);
        drawRoundedRect(context2d, x, y, width, height, 3);
        context2d.stroke();

        // Inner subtle fill
        context2d.fillStyle = appTheme.ui.selectionFillColor;
        context2d.globalAlpha = 0.1;
        context2d.fill();

        context2d.restore();
    }
}
