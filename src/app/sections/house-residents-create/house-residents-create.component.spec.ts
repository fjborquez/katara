import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { HouseResidentsCreateComponent } from './house-residents-create.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NutritionalProfileComponent } from '../../components/nutritional-profile/nutritional-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('HouseResidentsCreateComponent', () => {
  let component: HouseResidentsCreateComponent;
  let fixture: ComponentFixture<HouseResidentsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HouseResidentsCreateComponent,
        MatSnackBarModule,
        RouterModule.forRoot([]),
        NutritionalProfileComponent,
        ReactiveFormsModule,
        CommonModule
      ],
      providers: [provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();

    fixture = TestBed.createComponent(HouseResidentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
