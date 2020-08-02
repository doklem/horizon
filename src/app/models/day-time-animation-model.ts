export class DayTimeAnimationModel {
    constructor(
        public readonly attribute: string,
        public readonly dayTime: string,
        public readonly duration: string,
        public readonly values: string,
        public readonly freeze = true) {
    }
}
