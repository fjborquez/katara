import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseInventoryCreateComponent } from './house-inventory-create.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('HouseInventoryCreateComponent', () => {
  let component: HouseInventoryCreateComponent;
  let fixture: ComponentFixture<HouseInventoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseInventoryCreateComponent ],
      imports: [RouterTestingModule, MatSnackBarModule, HttpClientTestingModule, MatSelectModule,
          MatAutocompleteModule, FormsModule, ReactiveFormsModule ]
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
