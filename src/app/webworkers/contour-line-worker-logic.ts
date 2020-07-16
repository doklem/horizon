import { makeNoise2D, Noise2D } from 'open-simplex-noise';
import { ContourLineRequest } from '../models/contour-line-request';
import { ContourLineResponse } from '../models/contour-line-response';

export class ContourLineWorkerLogic {

    private static readonly SEED = 9001;

    private readonly noise2D: Noise2D;

    constructor() {
        this.noise2D = makeNoise2D(ContourLineWorkerLogic.SEED);
    }

    private static lerp(from: number, to: number, value: number): number {
        return from + ((to - from) * value);
    }

    public generateContourLine(request: ContourLineRequest): ContourLineResponse {
        const yValues = new Array<number>();
        for (let x = 0; x < request.bodyLength; x++) {
            yValues.push(this.nextY(request.seed, x * request.stretching, request.heightAmplitude, request.octaveCount));
        }
        const seamFactor = 1.0 / request.seamLength;
        for (let x = 0; x < request.seamLength; x++) {
            const y = ContourLineWorkerLogic.lerp(
                this.nextY(request.seed, (x + request.bodyLength) * request.stretching, request.heightAmplitude, request.octaveCount),
                yValues[x],
                x * seamFactor);
            yValues[x] = y;
            yValues.push(y);
        }
        return new ContourLineResponse(
            request.position,
            `0,${request.heightBody} `
            + yValues.map((y, x) => `${x},${y.toFixed(1)}`).join(' ')
            + ` ${request.bodyLength + request.seamLength},${request.heightBody}`);
    }

    private nextY(seed: number, x: number, amplitude: number, octaveCount: number): number {
        let y = 0;
        for (let octave = 1; octave <= octaveCount; octave++) {
            const octaveAmplitude = amplitude * Math.pow(2, -octave);
            y += (this.noise2D(x * octave, seed) * octaveAmplitude) + octaveAmplitude;
        }
        return y;
    }
}
