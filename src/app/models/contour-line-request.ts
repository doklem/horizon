import { ContourLinePosition } from './contour-line-position.enum';

export class ContourLineRequest {

    constructor(
        public readonly position: ContourLinePosition,
        public readonly seed: number,
        public readonly octaveCount: number,
        public readonly stretching: number,
        public readonly bodyLength: number,
        public readonly seamLength: number,
        public readonly heightAmplitude: number,
        public readonly heightBody: number) {
    }
}
