import { ContourLine } from '../models/contour-line';
import { Frame } from '../models/frame';
import { makeNoise2D, Noise2D } from 'open-simplex-noise';
import { ColorPlateGenerator } from './color-plate-generator';

export class FrameWorkerLogic {

    public static readonly CONTOUR_LINE_COUNT = 5;

    private static readonly CONTOUR_LINE_HEIGHT = 50;
    private static readonly HEIGHT = 400;
    private static readonly SPEED = 0.001;
    private static readonly WIDTH = 800;

    private readonly colorPlateGenerator: ColorPlateGenerator;
    private readonly contourLineYValues: Array<Array<number>>;
    private readonly noise2D: Noise2D;

    private steps: number;
    private dayTime: number;

    constructor() {
        this.colorPlateGenerator = new ColorPlateGenerator(FrameWorkerLogic.CONTOUR_LINE_COUNT);
        this.steps = 0;
        this.noise2D = makeNoise2D(Date.now());
        this.contourLineYValues = new Array<Array<number>>();
        for (let i = 0; i < FrameWorkerLogic.CONTOUR_LINE_COUNT; i++) {
            const yValues = new Array<number>();
            for (let x = 0; x < FrameWorkerLogic.WIDTH; x++) {
                yValues.push(FrameWorkerLogic.HEIGHT);
            }
            this.contourLineYValues.push(yValues);
        }
    }

    public generateFrameBatch(batchSize: number): Array<Frame> {
        const frames = new Array<Frame>();
        for (let i = 0; i < batchSize; i++) {
            this.steps += 1;
            this.dayTime = (this.steps % 2000) * 0.002;
            const colors = this.colorPlateGenerator.generateColorPlate(this.dayTime);
            this.moveContourLineYValues();
            const frame = new Frame();
            frame.height = FrameWorkerLogic.HEIGHT;
            frame.width = FrameWorkerLogic.WIDTH;
            frame.skyColor = colors.sky;
            frame.brightStarsOpacity = colors.brightStarsOpacity;
            frame.faintStarsOpacity = colors.faintStarsOpacity;
            frame.waterColor = colors.water;
            frame.contourLines = this.contourLineYValues
                .map((yValues, index) =>
                    new ContourLine(
                        this.yValuesToContourLinePoints(yValues),
                        colors.contourLines[index],
                        `translate(0,${60 + (index * 30)})`));
            frames.push(frame);
        }
        return frames;
    }

    private moveContourLineYValues(): void {
        this.contourLineYValues.forEach((yValues, index) => {
            const reverseIndex = FrameWorkerLogic.CONTOUR_LINE_COUNT - index;
            if (this.steps % reverseIndex === 0) {
                yValues.shift();
                yValues.push(this.nextY(this.steps * (index + 1) * FrameWorkerLogic.SPEED));
            }
        });
    }

    private nextY(distance: number): number {
        return (this.noise2D(distance, 0) * FrameWorkerLogic.CONTOUR_LINE_HEIGHT) + FrameWorkerLogic.CONTOUR_LINE_HEIGHT;
    }

    private yValuesToContourLinePoints(yValues: Array<number>): string {
        return `0,${FrameWorkerLogic.HEIGHT} `
            + yValues.map((y, x) => `${x},${y.toFixed(1)}`).join(' ')
            + ` ${FrameWorkerLogic.WIDTH},${FrameWorkerLogic.HEIGHT}`;
    }
}
