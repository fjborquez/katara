import { TestBed } from '@angular/core/testing';

import { NutritionalRestrictionService } from './nutritional-restriction.service';

describe('NutritionalRestrictionService', () => {
  let service: NutritionalRestrictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionalRestrictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
