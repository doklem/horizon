import { Injectable } from '@angular/core';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorPlateService {

  private static readonly CONTOUR_LINE_COLOR_DAY = Color.FOREST_GREEN;
  private static readonly CONTOUR_LINE_COLOR_NIGHT = Color.BLACK_RUSSIAN;

  public static readonly SKY_COLOR_DAY = Color.SKY_BLUE;
  public static readonly SKY_COLOR_NIGHT = Color.LUCKY_POINT;
  public static readonly WATER_COLOR_DAY = Color.NAVY_BLUE;
  public static readonly WATER_COLOR_NIGHT = Color.BLACK_PEARL;

  public generateContourLineColors(contourLineCount: number): Array<Array<string>> {
    const fogLevel = 1.0 / contourLineCount;
    const contourLineColors = new Array<Array<string>>();
    let contourLineDayColor: string = null;
    let contourLineNightColor: string = null;
    for (let y = 1; y <= contourLineCount; y++) {
      contourLineDayColor = Color.blend(
        ColorPlateService.SKY_COLOR_DAY,
        ColorPlateService.CONTOUR_LINE_COLOR_DAY,
        fogLevel * y).toString();
      contourLineNightColor = Color.blend(
        ColorPlateService.SKY_COLOR_NIGHT,
        ColorPlateService.CONTOUR_LINE_COLOR_NIGHT,
        fogLevel * y).toString();
      contourLineColors.push([
        contourLineDayColor.toString(),
        contourLineNightColor.toString()
      ]);
    }
    return contourLineColors;
  }
}
