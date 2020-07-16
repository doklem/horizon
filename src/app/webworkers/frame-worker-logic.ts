import { makeNoise2D, Noise2D } from 'open-simplex-noise';

export class FrameWorkerLogic {

    private static readonly CONTOUR_LINE_HEIGHT = 50;
    private static readonly HEIGHT = 400;

    private readonly noise2D: Noise2D;

    constructor() {
        this.noise2D = makeNoise2D(Date.now());
    }

    private static lerp(from: number, to: number, value: number): number {
        return from + ((to - from) * value);
    }

    public generateContourLine(stretching: number): string {
        const yValues = new Array<number>();
        const seed = 100 * Math.random();
        for (let x = 0; x < 2000; x++) {
            yValues.push(this.nextY(seed, x * stretching));
        }
        for (let x = 0; x < 1000; x++) {
            const y = FrameWorkerLogic.lerp(this.nextY(seed, (x + 2000) * stretching), yValues[x], x * 0.001);
            yValues[x] = y;
            yValues.push(y);
        }
        return `0,${FrameWorkerLogic.HEIGHT} `
            + yValues.map((y, x) => `${x},${y.toFixed(1)}`).join(' ')
            + ` ${3000},${FrameWorkerLogic.HEIGHT}`;
    }

    private nextY(seed: number, distance: number): number {
        return (this.noise2D(distance, seed) * FrameWorkerLogic.CONTOUR_LINE_HEIGHT) + FrameWorkerLogic.CONTOUR_LINE_HEIGHT;
    }
}
