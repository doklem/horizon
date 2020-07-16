import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FrameService {

  private readonly framesSubject: Subject<string>;
  private readonly worker: Worker;

  public readonly frames$: Observable<string>;

  constructor() {
    this.framesSubject = new Subject();
    this.frames$ = this.framesSubject.asObservable().pipe(shareReplay(1));
    this.worker = new Worker('../webworkers/frame.worker', { type: 'module' });
    this.worker.onmessage = ({ data }) => this.onNewContourLine(data);
  }

  public generateContourLine(stretching: number): void {
    this.worker.postMessage(stretching);
  }

  private onNewContourLine(data: any) {
    this.framesSubject.next(data);
  }
}
