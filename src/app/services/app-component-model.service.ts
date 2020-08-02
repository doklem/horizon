import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContourLineService } from './contour-line.service';
import { AppComponentModel } from '../models/app-component-model';
import { ContourLinePosition } from '../models/contour-line-position.enum';
import { ContourLineRequest } from '../models/contour-line-request';
import { ContourLineResponse } from '../models/contour-line-response';

@Injectable({
  providedIn: 'root'
})
export class AppComponentModelService {

  private contourLineSubscribtion: Subscription;

  public readonly model: AppComponentModel;

  constructor(contourLineService: ContourLineService) {
    // Create the model.
    this.model = new AppComponentModel();
    this.model.width = environment.renderWidth;
    this.model.height = environment.renderHeight;
    const speed = environment.contourLineSpeed;
    this.model.contourLineSpeedOffset = 5;
    this.model.diagonal = Math.hypot(this.model.width * 0.5, this.model.height);
    this.model.contourLineAmplitude = this.model.height * 0.125;
    this.model.contourLineBodyLength = this.model.width * 3;
    this.model.sunCycleDuration = `${environment.sunCycleInSeconds}s`;
    this.model.contourLineHeightBack = this.model.height * 0.25;
    this.model.contourLineGap = this.model.height * 0.15;
    this.model.contourLineHeightMiddle = this.model.contourLineHeightBack + this.model.contourLineGap;
    this.model.contourLineHeightFront = this.model.contourLineHeightMiddle + this.model.contourLineGap;
    this.model.waterHeight = this.model.height - this.model.contourLineGap;
    this.model.contourLineCycleDurationFront = `${this.model.width * speed}s`;
    this.model.contourLineCycleDurationMiddle = `${this.model.width * speed * this.model.contourLineSpeedOffset}s`;
    this.model.contourLineCycleDurationBack =
      `${this.model.width * speed * this.model.contourLineSpeedOffset * this.model.contourLineSpeedOffset}s`;
    this.model.sunRadius = this.model.height * 0.025;
    this.model.moonRadius = this.model.height * 0.0225;
    this.model.starRadius = this.model.height * 0.00125;
    this.model.faintStars1PatternSize = this.model.height * 0.15;
    this.model.faintStars2PatternSize = this.model.height * 0.275;
    this.model.brightStars1PatternSize = this.model.height * 0.25;
    this.model.brightStars2PatternSize = this.model.height * 0.35;
    this.model.animations = environment.animations;
    this.model.contourLinePointsBack = '';
    this.model.contourLinePointsMiddle = '';
    this.model.contourLinePointsFront = '';

    // Generate the contour lines in a asynchronous manner.
    this.contourLineSubscribtion = contourLineService.contourLine$
      .subscribe(response => this.onContourLineResponse(response));
    contourLineService.generateContourLineAsync(
      new ContourLineRequest(
        ContourLinePosition.Back,
        1,
        6,
        0.006,
        this.model.contourLineBodyLength,
        this.model.width,
        this.model.contourLineAmplitude,
        this.model.height));
    contourLineService.generateContourLineAsync(
      new ContourLineRequest(
        ContourLinePosition.Middle,
        2,
        3,
        0.004,
        this.model.contourLineBodyLength,
        this.model.width,
        this.model.contourLineAmplitude,
        this.model.height));
    contourLineService.generateContourLineAsync(
      new ContourLineRequest(
        ContourLinePosition.Front,
        3,
        2,
        0.002,
        this.model.contourLineBodyLength,
        this.model.width,
        this.model.contourLineAmplitude,
        this.model.height));
  }

  private onContourLineResponse(response: ContourLineResponse): void {
    switch (response.position) {
      case ContourLinePosition.Back:
        this.model.contourLinePointsBack = response.points;
        break;
      case ContourLinePosition.Middle:
        this.model.contourLinePointsMiddle = response.points;
        break;
      case ContourLinePosition.Front:
        this.model.contourLinePointsFront = response.points;
        break;
      default:
        break;
    }
    if (this.model.contourLinePointsBack !== ''
      && this.model.contourLinePointsMiddle !== ''
      && this.model.contourLinePointsFront !== '') {
      this.contourLineSubscribtion.unsubscribe();
    }
  }
}
