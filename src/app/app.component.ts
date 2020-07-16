import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FrameService } from './services/frame.service';
import { ColorPlateService } from './services/color-plate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  public static readonly CONTOUR_LINE_COUNT = 3;

  private contourLineSubscribtion: Subscription;

  public readonly animationSegmentLength = '30s';
  public readonly brightStarsOpacities = '0;0;1;1;1;0';
  public readonly faintStarsOpacities = '0;0;0.5;0.75;0.5;0';
  public readonly height = 400;
  public readonly width = 800;
  public readonly contourLineColors: Array<Array<string>>;
  public readonly skyColorDay: string;
  public readonly skyColorNight: string;
  public readonly waterColorDay: string;
  public readonly waterColorNight: string;

  public contourLinePoints: Array<string>;

  constructor(
    private frameService: FrameService,
    colorPlateService: ColorPlateService) {
    this.contourLinePoints = new Array<string>();
    this.contourLineColors = colorPlateService.generateContourLineColors(AppComponent.CONTOUR_LINE_COUNT);
    this.skyColorDay = ColorPlateService.SKY_COLOR_DAY.toString();
    this.skyColorNight = ColorPlateService.SKY_COLOR_NIGHT.toString();
    this.waterColorDay = ColorPlateService.WATER_COLOR_DAY.toString();
    this.waterColorNight = ColorPlateService.WATER_COLOR_NIGHT.toString();
  }

  public ngOnInit(): void {
    this.contourLineSubscribtion = this.frameService.frames$.subscribe(contourLinePoints => this.contourLinePoints.push(contourLinePoints));
    for (let i = 1; i <= AppComponent.CONTOUR_LINE_COUNT; i++) {
      this.frameService.generateContourLine(Math.pow(2, -i) * 0.025);
    }
  }

  public ngOnDestroy(): void {
    this.contourLineSubscribtion.unsubscribe();
  }
}
