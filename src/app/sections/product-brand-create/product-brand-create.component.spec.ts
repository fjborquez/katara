import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandCreateComponent } from './product-brand-create.component';

describe('ProductBrandCreateComponent', () => {
  let component: ProductBrandCreateComponent;
  let fixture: ComponentFixture<ProductBrandCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBrandCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBrandCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
