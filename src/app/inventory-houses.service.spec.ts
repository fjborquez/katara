import { TestBed } from '@angular/core/testing';

import { InventoryHousesService } from './inventory-houses.service';

describe('InventoryHousesService', () => {
  let service: InventoryHousesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryHousesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
