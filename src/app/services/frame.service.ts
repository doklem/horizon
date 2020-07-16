import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Frame } from '../models/frame';

@Injectable({
  providedIn: 'root'
})
export class FrameService {

  private readonly framesSubject: Subject<Array<Frame>>;
  private readonly worker: Worker;

  public readonly frames$: Observable<Array<Frame>>;

  constructor() {
    this.framesSubject = new Subject();
    this.frames$ = this.framesSubject.asObservable().pipe(shareReplay(1));
    this.worker = new Worker('../webworkers/frame.worker', { type: 'module' });
    this.worker.onmessage = ({ data }) => this.onFrameBatch(data);
  }

  public generateFrameBatch(amount: number): void {
    this.worker.postMessage(amount);
  }

  private onFrameBatch(data: any) {
    this.framesSubject.next(data);
  }
}
