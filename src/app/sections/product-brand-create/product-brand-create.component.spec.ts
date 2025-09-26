import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductBrandCreateComponent } from './product-brand-create.component';

describe('ProductBrandCreateComponent', () => {
  let component: ProductBrandCreateComponent;
  let fixture: ComponentFixture<ProductBrandCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductBrandCreateComponent,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductBrandCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
