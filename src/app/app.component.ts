import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContourLineService } from './services/contour-line.service';
import { ContourLineRequest } from './models/contour-line-request';
import { ContourLinePosition } from './models/contour-line-position.enum';
import { ContourLineResponse } from './models/contour-line-response';
import { AnimationBase } from './directives/animation-base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private contourLineSubscribtion: Subscription;

  public readonly width = 1920;
  public readonly height = 1080;
  public readonly speed = 0.025;
  public readonly contourLineSpeedOffset = 5;
  public readonly diagonal = Math.hypot(this.width, this.height);
  public readonly contourLineAmplitude = this.height * 0.125;
  public readonly contourLineBodyLength = this.width * 3;
  public readonly sunCycleDuration = `${AnimationBase.SUN_CYLCE_IN_REAL_SECONDS}s`;
  public readonly contourLineHeightBack = this.height * 0.25;
  public readonly contourLineGap = this.height * 0.15;
  public readonly contourLineHeightMiddle = this.contourLineHeightBack + this.contourLineGap;
  public readonly contourLineHeightFront = this.contourLineHeightMiddle + this.contourLineGap;
  public readonly waterHeight = this.height - this.contourLineGap;
  public readonly contourLineCycleDurationFront = `${this.width * this.speed}s`;
  public readonly contourLineCycleDurationMiddle = `${this.width * this.speed * this.contourLineSpeedOffset}s`;
  public readonly contourLineCycleDurationBack = `${this.width * this.speed * this.contourLineSpeedOffset * this.contourLineSpeedOffset}s`;
  public readonly sunRadius = this.height * 0.025;
  public readonly moonRadius = this.height * 0.0225;
  public readonly starRadius = this.height * 0.00125;
  public readonly faintStars1PatternSize = this.height * 0.15;
  public readonly faintStars2PatternSize = this.height * 0.275;
  public readonly brightStars1PatternSize = this.height * 0.25;
  public readonly brightStars2PatternSize = this.height * 0.35;

  public contourLinePointsBack: string;
  public contourLinePointsMiddle: string;
  public contourLinePointsFront: string;

  constructor(
    private contourLineService: ContourLineService) {
    this.contourLinePointsBack = '';
    this.contourLinePointsMiddle = '';
    this.contourLinePointsFront = '';
  }

  public ngOnInit(): void {
    this.contourLineSubscribtion = this.contourLineService.contourLine$
      .subscribe(response => this.onContourLineResponse(response));
    this.contourLineService.generateContourLineAsync(
      new ContourLineRequest(
        ContourLinePosition.Back,
        1,
        6,
        0.006,
        this.contourLineBodyLength,
        this.width,
        this.contourLineAmplitude,
        this.height));
    this.contourLineService.generateContourLineAsync(
      new ContourLineRequest(
        ContourLinePosition.Middle,
        2,
        3,
        0.004,
        this.contourLineBodyLength,
        this.width,
        this.contourLineAmplitude,
        this.height));
    this.contourLineService.generateContourLineAsync(
      new ContourLineRequest(
        ContourLinePosition.Front,
        3,
        2,
        0.002,
        this.contourLineBodyLength,
        this.width,
        this.contourLineAmplitude,
        this.height));
  }

  private onContourLineResponse(response: ContourLineResponse): void {
    switch (response.position) {
      case ContourLinePosition.Back:
        this.contourLinePointsBack = response.points;
        break;
      case ContourLinePosition.Middle:
        this.contourLinePointsMiddle = response.points;
        break;
      case ContourLinePosition.Front:
        this.contourLinePointsFront = response.points;
        break;
      default:
        break;
    }
    if (this.contourLinePointsBack !== ''
      && this.contourLinePointsMiddle !== ''
      && this.contourLinePointsFront !== '') {
      this.contourLineSubscribtion.unsubscribe();
    }
  }
}
