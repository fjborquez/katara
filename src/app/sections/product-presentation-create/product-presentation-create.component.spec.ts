import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPresentationCreateComponent } from './product-presentation-create.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProductPresentationCreateComponent', () => {
  let component: ProductPresentationCreateComponent;
  let fixture: ComponentFixture<ProductPresentationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ProductPresentationCreateComponent],
    imports: [MatSnackBarModule, FormsModule, ReactiveFormsModule],
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
