import { DayTimeAnimationModel } from '../models/day-time-animation-model';

export interface IAnimationConfig {
    cloudCore: Array<DayTimeAnimationModel>;
    cloudLeft: Array<DayTimeAnimationModel>;
    cloudRight: Array<DayTimeAnimationModel>;
    cloudRime: Array<DayTimeAnimationModel>;
    contourLineBack: Array<DayTimeAnimationModel>;
    contourLineFront: Array<DayTimeAnimationModel>;
    contourLineMiddle: Array<DayTimeAnimationModel>;
    corona: Array<DayTimeAnimationModel>;
    sky: Array<DayTimeAnimationModel>;
    stars: Array<DayTimeAnimationModel>;
    sun: Array<DayTimeAnimationModel>;
    waterAlbedo: Array<DayTimeAnimationModel>;
}
