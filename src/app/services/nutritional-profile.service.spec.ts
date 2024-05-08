import { TestBed } from '@angular/core/testing';

import { NutritionalProfileService } from './nutritional-profile.service';

describe('UserProfileService', () => {
  let service: NutritionalProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionalProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
