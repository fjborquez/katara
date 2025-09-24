import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandCreateComponent } from './product-brand-create.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProductBrandCreateComponent', () => {
  let component: ProductBrandCreateComponent;
  let fixture: ComponentFixture<ProductBrandCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ProductBrandCreateComponent],
    imports: [MatSnackBarModule, FormsModule, ReactiveFormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi())]
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
