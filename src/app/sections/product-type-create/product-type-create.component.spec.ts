import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeCreateComponent } from './product-type-create.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProductTypeCreateComponent', () => {
  let component: ProductTypeCreateComponent;
  let fixture: ComponentFixture<ProductTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ProductTypeCreateComponent],
    imports: [MatSnackBarModule, FormsModule, ReactiveFormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
    .compileComponents();

    fixture = TestBed.createComponent(ProductTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
