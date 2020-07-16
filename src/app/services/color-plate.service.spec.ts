import { TestBed } from '@angular/core/testing';

import { ColorPlateService } from './color-plate.service';

describe('ColorPlateService', () => {
  let service: ColorPlateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorPlateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
