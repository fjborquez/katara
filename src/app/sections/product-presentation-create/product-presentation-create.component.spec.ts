import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPresentationCreateComponent } from './product-presentation-create.component';

describe('ProductPresentationCreateComponent', () => {
  let component: ProductPresentationCreateComponent;
  let fixture: ComponentFixture<ProductPresentationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPresentationCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPresentationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
