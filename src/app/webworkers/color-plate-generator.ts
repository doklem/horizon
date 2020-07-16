import { ColorPlate } from '../models/color-plate';
import { Color } from '../models/color';

export class ColorPlateGenerator {

    private static readonly CONTOUR_LINE_COLOR_DAY = Color.FOREST_GREEN;
    private static readonly CONTOUR_LINE_COLOR_NIGHT = Color.BLACK_RUSSIAN;
    private static readonly SKY_COLOR_DAY = Color.SKY_BLUE;
    private static readonly SKY_COLOR_NIGHT = Color.LUCKY_POINT;
    private static readonly WATER_COLOR_DAY = Color.NAVY_BLUE;
    private static readonly WATER_COLOR_NIGHT = Color.BLACK_PEARL;

    private readonly fogLevel: number;

    constructor(private readonly contourLineCount: number) {
        this.fogLevel = 1.0 / contourLineCount;
    }

    public generateColorPlate(dayTime: number): ColorPlate {
        const plate = new ColorPlate();
        let groundColor: Color = null;
        let skyColor: Color = null;
        let waterColor: Color = null;
        if (dayTime < 1.0) { // Night
            groundColor = ColorPlateGenerator.CONTOUR_LINE_COLOR_NIGHT;
            skyColor = ColorPlateGenerator.SKY_COLOR_NIGHT;
            plate.brightStarsOpacity = 1.0;
            plate.faintStarsOpacity = 1.0 - Math.abs(dayTime * 2.0 - 1.0);
            waterColor = ColorPlateGenerator.WATER_COLOR_NIGHT;
        } else if (dayTime < 2.0) { // Dawn
            groundColor = Color.blend(
                ColorPlateGenerator.CONTOUR_LINE_COLOR_NIGHT,
                ColorPlateGenerator.CONTOUR_LINE_COLOR_DAY,
                dayTime - 1.0);
            skyColor = Color.blend(
                ColorPlateGenerator.SKY_COLOR_NIGHT,
                ColorPlateGenerator.SKY_COLOR_DAY,
                dayTime - 1.0);
            plate.brightStarsOpacity = 2.0 - dayTime;
            plate.faintStarsOpacity = 0.0;
            waterColor = Color.blend(
                ColorPlateGenerator.WATER_COLOR_NIGHT,
                ColorPlateGenerator.WATER_COLOR_DAY,
                dayTime - 1.0);
        } else if (dayTime < 3.0) { // Day
            groundColor = ColorPlateGenerator.CONTOUR_LINE_COLOR_DAY;
            skyColor = ColorPlateGenerator.SKY_COLOR_DAY;
            plate.brightStarsOpacity = 0.0;
            plate.faintStarsOpacity = 0.0;
            waterColor = ColorPlateGenerator.WATER_COLOR_DAY;
        } else { // Dusk
            groundColor = Color.blend(
                ColorPlateGenerator.CONTOUR_LINE_COLOR_DAY,
                ColorPlateGenerator.CONTOUR_LINE_COLOR_NIGHT,
                dayTime - 3.0);
            skyColor = Color.blend(
                ColorPlateGenerator.SKY_COLOR_DAY,
                ColorPlateGenerator.SKY_COLOR_NIGHT,
                dayTime - 3.0);
            plate.brightStarsOpacity = dayTime - 3.0;
            plate.faintStarsOpacity = 0.0;
            waterColor = Color.blend(
                ColorPlateGenerator.WATER_COLOR_DAY,
                ColorPlateGenerator.WATER_COLOR_NIGHT,
                dayTime - 3.0);
        }
        plate.sky = skyColor.toString();
        plate.water = waterColor.toString();
        plate.contourLines = new Array<string>();
        for (let y = 1; y <= this.contourLineCount; y++) {
            plate.contourLines.push(Color.blend(
                skyColor,
                groundColor,
                this.fogLevel * y).toString());
        }
        return plate;
    }
}
