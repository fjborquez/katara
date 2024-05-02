import { TestBed } from '@angular/core/testing';

import { PersonHouseService } from './person-house.service';

describe('PersonHouseService', () => {
  let service: PersonHouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonHouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
