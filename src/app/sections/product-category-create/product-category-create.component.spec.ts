import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryCreateComponent } from './product-category-create.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProductCategoryCreateComponent', () => {
  let component: ProductCategoryCreateComponent;
  let fixture: ComponentFixture<ProductCategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryCreateComponent ],
      imports: [MatSnackBarModule, HttpClientTestingModule, MatAutocompleteModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
