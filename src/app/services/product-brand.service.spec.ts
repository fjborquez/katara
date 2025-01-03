import { TestBed } from '@angular/core/testing';

import { ProductBrandService } from './product-brand.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductBrandService', () => {
  let service: ProductBrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ProductBrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
