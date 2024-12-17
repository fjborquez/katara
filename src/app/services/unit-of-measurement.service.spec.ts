import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UnitOfMeasurementService } from './unit-of-measurement.service';

describe('CityService', () => {
  let service: UnitOfMeasurementService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UnitOfMeasurementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
