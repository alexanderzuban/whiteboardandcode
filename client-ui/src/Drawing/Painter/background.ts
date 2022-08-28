import {DrawingContext} from "../Shape/shapes";

export default class Background {
    readonly DefaultCellSize = 40;
    readonly DefaultGridColor = "lightGray";

    paint(context: DrawingContext, context2d: CanvasRenderingContext2D): void {
        if (!context.settings.background.isDisplayGrid) {
            return;
        }
        const background = context.settings.background;
        const document = context.document;

        const cellSize = background.gridSize ?? this.DefaultCellSize;

        // Box width
        const bw = context2d.canvas.width + cellSize;

        // Box height
        const bh = context2d.canvas.height + cellSize;


        const startX = -1 * document.origin.x % cellSize;

        const startY = -1 * document.origin.y % cellSize;
        context2d.save();
        //
        context2d.translate(0.5, 0.5);
        context2d.beginPath();

        context2d.strokeStyle = background.gridColor ?? this.DefaultGridColor;
        context2d.lineWidth = 1;

        for (let x = startX; x <= bw; x += cellSize) {
            context2d.moveTo(x, 0);
            context2d.lineTo(x, bh);
        }

        for (let y = startY; y <= bh; y += cellSize) {
            context2d.moveTo(0, y);
            context2d.lineTo(bw, y);
        }


        context2d.stroke();
        context2d.restore();
    }

}

