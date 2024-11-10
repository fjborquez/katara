import { TestBed } from '@angular/core/testing';

import { InventoryHousesService } from './inventory-houses.service';
import { HttpClientModule } from '@angular/common/http';

describe('InventoryHousesService', () => {
  let service: InventoryHousesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(InventoryHousesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
