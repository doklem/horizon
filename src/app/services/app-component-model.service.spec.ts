import { TestBed } from '@angular/core/testing';

import { AppComponentModelService } from './app-component-model.service';

describe('AppComponentModelService', () => {
  let service: AppComponentModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppComponentModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
