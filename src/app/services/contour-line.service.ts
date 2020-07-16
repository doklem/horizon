import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ContourLineRequest } from '../models/contour-line-request';
import { ContourLineResponse } from '../models/contour-line-response';

@Injectable({
  providedIn: 'root'
})
export class ContourLineService {

  private readonly contourLineSubject: Subject<ContourLineResponse>;
  private readonly worker: Worker;

  public readonly contourLine$: Observable<ContourLineResponse>;

  constructor() {
    this.contourLineSubject = new Subject();
    this.contourLine$ = this.contourLineSubject.asObservable().pipe(shareReplay(1));
    this.worker = new Worker('../webworkers/contour-line.worker', { type: 'module' });
    this.worker.onmessage = ({ data }) => this.onContourLineResponse(data);
  }

  public generateContourLineAsync(request: ContourLineRequest): void {
    this.worker.postMessage(request);
  }

  private onContourLineResponse(data: any) {
    this.contourLineSubject.next(data);
  }
}
