import { TestBed } from '@angular/core/testing';

import { ProductBrandService } from './product-brand.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProductBrandService', () => {
  let service: ProductBrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ProductBrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
