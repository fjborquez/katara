import { TestBed } from '@angular/core/testing';

import { ProductCatalogService } from './product-catalog.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProductCatalogService', () => {
  let service: ProductCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ProductCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
