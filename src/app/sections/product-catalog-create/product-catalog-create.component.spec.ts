import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductCatalogCreateComponent } from './product-catalog-create.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('ProductCatalogCreateComponent', () => {
  let component: ProductCatalogCreateComponent;
  let fixture: ComponentFixture<ProductCatalogCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [],
    imports: [
      ProductCatalogCreateComponent,
      MatSnackBarModule,
      MatAutocompleteModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting(), provideRouter([])]
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
