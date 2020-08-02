import { IAnimationConfig } from '../interfaces/ianimation-config';
import { ContourLineModel } from './contour-line-model';

export class AppComponentModel {
    public animations: IAnimationConfig;
    public brightStars1PatternSize: number;
    public brightStars2PatternSize: number;
    public celestialBodiesX: number;
    public contourLineAmplitude: number;
    public contourLineBodyLength: number;
    public contourLineBack: ContourLineModel;
    public contourLineFront: ContourLineModel;
    public contourLineMiddle: ContourLineModel;
    public contourLineGap: number;
    public contourLineSpeedOffset: number;
    public diagonal: number;
    public faintStars1PatternSize: number;
    public faintStars2PatternSize: number;
    public height: number;
    public moonRadius: number;
    public starRadius: number;
    public sunCycleDuration: string;
    public sunRadius: number;
    public waterHeight: number;
    public width: number;
}
