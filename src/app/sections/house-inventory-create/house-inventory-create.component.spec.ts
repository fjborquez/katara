import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { HouseInventoryCreateComponent } from './house-inventory-create.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('HouseInventoryCreateComponent', () => {
  let component: HouseInventoryCreateComponent;
  let fixture: ComponentFixture<HouseInventoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HouseInventoryCreateComponent, MatSnackBarModule, MatSelectModule,
        MatAutocompleteModule, FormsModule, ReactiveFormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting(), provideRouter([])]
})
    .compileComponents();

    fixture = TestBed.createComponent(HouseInventoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
