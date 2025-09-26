import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductPresentationCreateComponent } from './product-presentation-create.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductPresentationCreateComponent', () => {
  let component: ProductPresentationCreateComponent;
  let fixture: ComponentFixture<ProductPresentationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ProductPresentationCreateComponent, MatSnackBarModule, FormsModule, ReactiveFormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
