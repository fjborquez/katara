import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HouseInventoryUpdateComponent } from './house-inventory-update.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HouseInventoryUpdateComponent', () => {
  let component: HouseInventoryUpdateComponent;
  let fixture: ComponentFixture<HouseInventoryUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [HouseInventoryUpdateComponent],
    imports: [RouterTestingModule,
        MatSnackBarModule,
        MatSelectModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();

    fixture = TestBed.createComponent(HouseInventoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
