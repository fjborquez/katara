import { TestBed } from '@angular/core/testing';

import { ProductTypeService } from './product-type.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProductTypeService', () => {
  let service: ProductTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ProductTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
