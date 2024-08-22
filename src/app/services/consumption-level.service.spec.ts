import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ConsumptionLevelService } from './consumption-level.service';

describe('ConsumptionLevelService', () => {
  let service: ConsumptionLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ConsumptionLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
