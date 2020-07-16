export class AnimationBase {

    public static readonly SUN_CYLCE_IN_REAL_SECONDS = 40;

    protected static readonly SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

    protected static readonly SUN_CYCLE_RATIO = AnimationBase.SUN_CYLCE_IN_REAL_SECONDS / new Date('1970-01-02T00:00Z').valueOf();

    protected convertToRealSeconds(dayTime: string): number {
        return new Date(`1970-01-01T${dayTime}Z`).valueOf() * AnimationBase.SUN_CYCLE_RATIO;
    }
}
