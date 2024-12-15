import { TestBed } from '@angular/core/testing';

import { ProductTypeService } from './product-type.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductTypeService', () => {
  let service: ProductTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ProductTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
