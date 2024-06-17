import { TestBed } from '@angular/core/testing';

import { NutritionalProfileService } from './nutritional-profile.service';
import { HttpClientModule } from '@angular/common/http';

describe('NutritionalProfileService', () => {
  let service: NutritionalProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(NutritionalProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
