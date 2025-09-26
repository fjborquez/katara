import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductCategoryCreateComponent } from './product-category-create.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('ProductCategoryCreateComponent', () => {
  let component: ProductCategoryCreateComponent;
  let fixture: ComponentFixture<ProductCategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
      ProductCategoryCreateComponent,
      MatSnackBarModule,
      MatAutocompleteModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting(), provideRouter([])]
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
