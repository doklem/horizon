import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContourLineService } from './services/contour-line.service';
import { ContourLineRequest } from './models/contour-line-request';
import { ContourLinePosition } from './models/contour-line-position.enum';
import { ContourLineResponse } from './models/contour-line-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private contourLineSubscribtion: Subscription;

  public readonly height = 400;
  public readonly width = 800;
  public readonly diagonal = Math.hypot(this.width, this.height);
  public readonly contourLineAmplitude = 50;
  public readonly contourLineBodyLength = this.width * 3;

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
        0.0125,
        this.contourLineBodyLength,
        this.width,
        this.contourLineAmplitude,
        this.height));
    this.contourLineService.generateContourLineAsync(
      new ContourLineRequest(
        ContourLinePosition.Middle,
        2,
        0.00625,
        this.contourLineBodyLength,
        this.width,
        this.contourLineAmplitude,
        this.height));
    this.contourLineService.generateContourLineAsync(
      new ContourLineRequest(
        ContourLinePosition.Front,
        3,
        0.003125,
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
