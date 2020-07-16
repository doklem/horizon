import { ContourLinePosition } from './contour-line-position.enum';

export class ContourLineResponse {

    constructor(
        public readonly position: ContourLinePosition,
        public readonly points: string) {
    }
}
