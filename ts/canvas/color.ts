export class Color {

    private alpha: number = 1;

    public static WHITE: Color = new Color(255, 255, 255);
    public static BLACK: Color = new Color(0, 0, 0);
    public static BLUE: Color = new Color(0, 20, 255);
    public static PURPLE: Color = new Color(235, 0, 255);
    public static RED: Color = new Color(238, 34, 51);
    public static ORANGE: Color = new Color(255, 170, 0);

    public constructor(
        private red: number,
        private green: number,
        private blue: number) {}

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