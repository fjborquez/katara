import { TestBed } from '@angular/core/testing';

import { UserHousesService } from './user-houses.service';

describe('PersonHouseService', () => {
  let service: UserHousesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHousesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
