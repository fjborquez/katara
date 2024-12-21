import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandCreateComponent } from './product-brand-create.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProductBrandCreateComponent', () => {
  let component: ProductBrandCreateComponent;
  let fixture: ComponentFixture<ProductBrandCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBrandCreateComponent ],
      imports: [MatSnackBarModule, HttpClientModule, FormsModule, ReactiveFormsModule]
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
