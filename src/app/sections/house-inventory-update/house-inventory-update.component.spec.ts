import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { HouseInventoryUpdateComponent } from './house-inventory-update.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('HouseInventoryUpdateComponent', () => {
  let component: HouseInventoryUpdateComponent;
  let fixture: ComponentFixture<HouseInventoryUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        HouseInventoryUpdateComponent,
        MatSnackBarModule,
        MatSelectModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      provideHttpClientTesting(),
      provideRouter([])
    ]
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
