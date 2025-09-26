import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserHouseCreateComponent } from './user-house-create.component';
import { provideRouter } from '@angular/router';

describe('UserHouseCreateComponent', () => {
  let component: UserHouseCreateComponent;
  let fixture: ComponentFixture<UserHouseCreateComponent>;

  const formGroupDirective = new FormGroupDirective([], []);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserHouseCreateComponent,
        MatSnackBarModule,
        MatSelectModule,
        ReactiveFormsModule,
        CommonModule
      ],
      providers: [
        FormBuilder,
        { provide: FormGroupDirective, useValue: formGroupDirective },
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserHouseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
