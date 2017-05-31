import { Color } from "./color";
import { Rectangle, Line } from "./datatypes";

export class Canvas {

    private context: CanvasRenderingContext2D;
    private height: number;
    private width: number;
    private el: HTMLCanvasElement;

    public constructor(
        id: string
    ) {
        this.el = <HTMLCanvasElement> document.getElementById(id);
        this.context = this.el.getContext("2d");
    }

    public setHeight(height: number): Canvas {
        this.height = height;
        this.el.height = this.height;
        return this;
    }

    public getWidth(): number {
        return this.width;
    }

    public setWidth(width: number): Canvas {
        this.width = width;
        this.el.width = this.width;
        return this;
    }

    public getHeight(): number {
        return this.height;
    }

    public setFillColor(color: Color): Canvas {
        this.context.fillStyle = color.getRgbaRepresentation();
        return this;
    }

    public drawRectangle(rect: Rectangle): Canvas {
        this.context.fillRect(rect.x, rect.y, rect.w, rect.h);
        return this;
    }

    public drawLine(line: Line, color?: Color): void {
        this.context.beginPath();
        this.context.moveTo(line.fromX, line.fromY);
        this.context.lineTo(line.toX, line.toY);
        this.context.lineWidth = line.lineWidth;
        this.context.lineCap = "round";

        if (color) {
            this.context.strokeStyle = color.getRgbaRepresentation();
        } else {
            this.context.strokeStyle = Color.getRandomColor().getRgbaRepresentation();
        }
        this.context.stroke();
    }

}