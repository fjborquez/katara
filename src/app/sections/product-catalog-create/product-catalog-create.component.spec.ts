import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatalogCreateComponent } from './product-catalog-create.component';

describe('ProductCatalogCreateComponent', () => {
  let component: ProductCatalogCreateComponent;
  let fixture: ComponentFixture<ProductCatalogCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCatalogCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCatalogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
