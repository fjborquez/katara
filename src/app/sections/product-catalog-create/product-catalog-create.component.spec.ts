import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatalogCreateComponent } from './product-catalog-create.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProductCatalogCreateComponent', () => {
  let component: ProductCatalogCreateComponent;
  let fixture: ComponentFixture<ProductCatalogCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ProductCatalogCreateComponent],
    imports: [MatSnackBarModule, MatAutocompleteModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
