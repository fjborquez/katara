import { TestBed } from '@angular/core/testing';

import { HouseService } from './house.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HouseService', () => {
  let service: HouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi())]
});
    service = TestBed.inject(HouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
