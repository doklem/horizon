export class Color {

    public static readonly BLACK_PEARL = new Color(0, 25, 40, 255);
    public static readonly FOREST_GREEN = new Color(34, 139, 34, 255);
    public static readonly LUCKY_POINT = new Color(49, 50, 81, 255);
    public static readonly NAVY_BLUE = new Color(0, 119, 190, 255);
    public static readonly SKY_BLUE = new Color(135, 206, 235, 255);
    public static readonly BLACK_RUSSIAN = new Color(10, 12, 50, 255);

    constructor(
        public readonly r: number,
        public readonly g: number,
        public readonly b: number,
        public readonly a: number) {
    }

    public static blend(from: Color, to: Color, value: number): Color {
        return new Color(
            Color.lerp(from.r, to.r, value),
            Color.lerp(from.g, to.g, value),
            Color.lerp(from.b, to.b, value),
            Color.lerp(from.a, to.a, value));
    }

    private static lerp(from: number, to: number, value: number): number {
        return (to - from) * value + from;
    }

    public toString(): string {
        return `rgba(${this.r.toFixed(0)},${this.g.toFixed(0)},${this.b.toFixed(0)},${this.a.toFixed(0)})`;
    }
}
