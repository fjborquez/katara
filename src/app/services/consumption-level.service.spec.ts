import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ConsumptionLevelService } from './consumption-level.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ConsumptionLevelService', () => {
  let service: ConsumptionLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ConsumptionLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
