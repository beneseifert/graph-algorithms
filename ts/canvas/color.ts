export class Color {

    private alpha: number = 1;
    private gradientMovingBrighter: boolean = true;

    public static WHITE: Color = new Color(255, 255, 255);
    public static BLACK: Color = new Color(0, 0, 0);
    public static BLUE: Color = new Color(0, 20, 255);
    public static PURPLE: Color = new Color(235, 0, 255);
    public static RED: Color = new Color(238, 34, 51);
    public static ORANGE: Color = new Color(255, 170, 0);
    public static YELLOW: Color = new Color(235, 235, 30);
    public static LIGHTBLUE: Color = new Color(90, 130, 225);

    public static BRIGHTEN_UP_BY: number = .2;

    public constructor(
        private red: number,
        private green: number,
        private blue: number
    ) {}

    public setAlpha(alpha: number): Color {
        this.alpha = alpha;
        return this;
    }

    public static getRandomColor(): Color {
        return new Color(
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
        );
    }

    public nextColorForGradient(): Color {
        let factor: number;
        let color: Color;
        if (this.gradientMovingBrighter) {
            factor = 1 + Color.BRIGHTEN_UP_BY;
            color = new Color(
                Math.max(Math.min(Math.ceil(this.red * factor), 255), 1),
                Math.max(Math.min(Math.ceil(this.green * factor), 255), 1),
                Math.max(Math.min(Math.ceil(this.blue * factor), 255), 1)
            );
        } else {
            factor = 1 - Color.BRIGHTEN_UP_BY;
            color = new Color(
                Math.max(Math.min(Math.floor(this.red * factor), 255), 1),
                Math.max(Math.min(Math.floor(this.green * factor), 255), 1),
                Math.max(Math.min(Math.floor(this.blue * factor), 255), 1)
            );
        }
        if (this.gradientMovingBrighter && color.oneChannelAtMax()) {
            color.gradientMovingBrighter = false;
        } else if (!this.gradientMovingBrighter && color.oneChannelAtMin(20)) {
            color.gradientMovingBrighter = true;
        } else {
            color.gradientMovingBrighter = this.gradientMovingBrighter;
        }
        return color;
    }

    public oneChannelAtMax(maximum?: number): boolean {
        let comparison: number = maximum || 255;
        return this.red >= comparison || this.green >= comparison || this.blue >= comparison;
    }

    public oneChannelAtMin(minimum?: number): boolean {
        let comparison: number = minimum || 0
        return this.red <= comparison || this.green <= comparison || this.blue <= comparison;
    }

    public static getRandomGreyColor() : Color {
        let brightness = Math.floor(Math.random() * 255);
        return new Color(brightness, brightness, brightness);
    }

    public getHashRepresentation(): string {
        return "#" + Color.toHex(this.red) + Color.toHex(this.green) + Color.toHex(this.blue);
    }

    public getRgbRepresentation(): string {
        return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
    }

    public getRgbaRepresentation(): string {
        return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
    }

    private static toHex(baseTen: number): string {
        return (baseTen).toString(16);
    }

}