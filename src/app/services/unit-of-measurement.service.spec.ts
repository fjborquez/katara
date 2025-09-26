import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UnitOfMeasurementService } from './unit-of-measurement.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CityService', () => {
  let service: UnitOfMeasurementService

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(UnitOfMeasurementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
