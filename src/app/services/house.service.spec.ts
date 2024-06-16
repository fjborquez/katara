import { TestBed } from '@angular/core/testing';

import { HouseService } from './house.service';
import { HttpClientModule } from '@angular/common/http';

describe('HouseService', () => {
  let service: HouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(HouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
