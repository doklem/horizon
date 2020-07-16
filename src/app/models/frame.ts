import { ContourLine } from './contour-line';

export class Frame {
    public contourLines: Array<ContourLine>;
    public height: number;
    public skyColor: string;
    public brightStarsOpacity: number;
    public faintStarsOpacity: number;
    public waterColor: string;
    public width: number;
}
