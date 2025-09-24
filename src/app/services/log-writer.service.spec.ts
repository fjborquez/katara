import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CityService } from './city.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CityService', () => {
  let service: CityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(CityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
