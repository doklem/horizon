import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Frame } from './models/frame';
import { FrameService } from './services/frame.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  private frameBuffer: Array<Frame>;
  private framesSubscribtion: Subscription;

  public frame: Frame;

  constructor(private frameService: FrameService) {
    this.frameBuffer = new Array<Frame>();
  }

  public ngOnInit(): void {
    this.frameBuffer = [];
    this.framesSubscribtion = this.frameService.frames$.subscribe(frames => frames.forEach(frame => this.frameBuffer.push(frame)));
    this.frameService.generateFrameBatch(500);
    requestAnimationFrame(() => this.paintFrame());
  }

  public ngOnDestroy(): void {
    this.framesSubscribtion.unsubscribe();
  }

  private paintFrame(): void {
    this.frame = this.frameBuffer.shift();
    if (this.frameBuffer.length < 100) {
      this.frameService.generateFrameBatch(500);
    }
    requestAnimationFrame(() => this.paintFrame());
  }
}
