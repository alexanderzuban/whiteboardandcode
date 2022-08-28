import {appTheme} from "../../Style/theme";
import {Rect} from "../../Common/point";
import {Nullable} from "../../Common/generics";

export default class Selection {


    paint(rect: Nullable<Rect>, context2d: CanvasRenderingContext2D): void {
        if (rect) {
            const maxX = rect.topLeft.x - 4;
            const maxY = rect.topLeft.y - 4;
            const minX = rect.bottomRight.x + 4;
            const minY = rect.bottomRight.y + 4;

            context2d.save();
            context2d.beginPath();
            context2d.translate(0.5, 0.5);
            context2d.lineWidth = 1;
            context2d.strokeStyle = appTheme.ui.selectionColor;
            context2d.setLineDash([10, 5]);
            context2d.rect(minX, minY, maxX - minX, maxY - minY);
            context2d.stroke();
            context2d.restore();
        }


    }

}

