import { TestBed } from '@angular/core/testing';

import { InventoryHousesService } from './inventory-houses.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('InventoryHousesService', () => {
  let service: InventoryHousesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi())]
});
    service = TestBed.inject(InventoryHousesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
