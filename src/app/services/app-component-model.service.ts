import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContourLineService } from './contour-line.service';
import { AppComponentModel } from '../models/app-component-model';
import { ContourLinePosition } from '../models/contour-line-position.enum';
import { ContourLineRequest } from '../models/contour-line-request';
import { ContourLineResponse } from '../models/contour-line-response';
import { ContourLineModel } from '../models/contour-line-model';

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
    this.model.celestialBodiesX = this.model.width * 0.25;
    this.model.contourLineSpeedOffset = 5;
    this.model.diagonal = Math.hypot(this.model.width, this.model.height);
    this.model.contourLineAmplitude = this.model.height * 0.125;
    this.model.contourLineBodyLength = this.model.width * 3;
    this.model.sunCycleDuration = `${environment.sunCycleInSeconds}s`;
    this.model.contourLineGap = this.model.height * 0.15;
    this.model.contourLineBack = new ContourLineModel();
    this.model.contourLineFront = new ContourLineModel();
    this.model.contourLineMiddle = new ContourLineModel();
    this.model.contourLineFront.cycleDuration = `${this.model.width * speed}s`;
    this.model.contourLineMiddle.cycleDuration = `${this.model.width * speed * this.model.contourLineSpeedOffset}s`;
    this.model.contourLineBack.cycleDuration =
      `${this.model.width * speed * this.model.contourLineSpeedOffset * this.model.contourLineSpeedOffset}s`;
    this.model.contourLineBack.height = this.model.height * 0.25;
    this.model.contourLineMiddle.height = this.model.contourLineBack.height + this.model.contourLineGap;
    this.model.contourLineFront.height = this.model.contourLineMiddle.height + this.model.contourLineGap;
    this.model.waterHeight = this.model.height - this.model.contourLineGap;
    this.model.contourLineBack.points = '';
    this.model.contourLineMiddle.points = '';
    this.model.contourLineFront.points = '';
    this.model.sunRadius = this.model.height * 0.025;
    this.model.moonRadius = this.model.height * 0.0225;
    this.model.starRadius = this.model.height * 0.00125;
    this.model.faintStars1PatternSize = this.model.height * 0.15;
    this.model.faintStars2PatternSize = this.model.height * 0.275;
    this.model.brightStars1PatternSize = this.model.height * 0.25;
    this.model.brightStars2PatternSize = this.model.height * 0.35;
    this.model.animations = environment.animations;

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
        this.model.contourLineBack.points = response.points;
        break;
      case ContourLinePosition.Middle:
        this.model.contourLineMiddle.points = response.points;
        break;
      case ContourLinePosition.Front:
        this.model.contourLineFront.points = response.points;
        break;
      default:
        break;
    }
    if (this.model.contourLineBack.points !== ''
      && this.model.contourLineMiddle.points !== ''
      && this.model.contourLineFront.points !== '') {
      this.contourLineSubscribtion.unsubscribe();
    }
  }
}
