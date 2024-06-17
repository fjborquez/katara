import { TestBed } from '@angular/core/testing';

import { UserHousesService } from './user-houses.service';
import { HttpClientModule } from '@angular/common/http';

describe('UserHousesService', () => {
  let service: UserHousesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(UserHousesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
