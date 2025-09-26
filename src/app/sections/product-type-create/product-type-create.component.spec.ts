import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductTypeCreateComponent } from './product-type-create.component';

describe('ProductTypeCreateComponent', () => {
  let component: ProductTypeCreateComponent;
  let fixture: ComponentFixture<ProductTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTypeCreateComponent, MatSnackBarModule, FormsModule, ReactiveFormsModule],
      providers: [provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
