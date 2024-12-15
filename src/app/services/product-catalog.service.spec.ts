import { TestBed } from '@angular/core/testing';

import { ProductCatalogService } from './product-catalog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductCatalogService', () => {
  let service: ProductCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ProductCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
