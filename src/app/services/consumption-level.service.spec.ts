import { TestBed } from '@angular/core/testing';

import { ConsumptionLevelService } from './consumption-level.service';

describe('ConsumptionLevelService', () => {
  let service: ConsumptionLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumptionLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
