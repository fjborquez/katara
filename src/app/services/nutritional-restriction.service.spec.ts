import { TestBed } from '@angular/core/testing';

import { NutritionalRestrictionService } from './nutritional-restriction.service';
import { HttpClientModule } from '@angular/common/http';

describe('NutritionalRestrictionService', () => {
  let service: NutritionalRestrictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(NutritionalRestrictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
