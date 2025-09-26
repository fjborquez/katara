import { TestBed } from '@angular/core/testing';

import { NutritionalRestrictionService } from './nutritional-restriction.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NutritionalRestrictionService', () => {
  let service: NutritionalRestrictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi())]
});
    service = TestBed.inject(NutritionalRestrictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
