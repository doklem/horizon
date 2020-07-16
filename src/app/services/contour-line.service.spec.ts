import { TestBed } from '@angular/core/testing';

import { ContourLineService } from './contour-line.service';

describe('ContourLineService', () => {
  let service: ContourLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContourLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
