import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, RouterModule, provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { UserHouseUpdateComponent } from './user-house-update.component';

describe('UserHouseUpdateComponent', () => {
  let component: UserHouseUpdateComponent;
  let fixture: ComponentFixture<UserHouseUpdateComponent>;

  const formGroupDirective = new FormGroupDirective([], []);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule,
        MatSnackBarModule,
        MatSelectModule,
        ReactiveFormsModule,
        UserHouseUpdateComponent,
        RouterLink,
      ],
      providers: [
        FormGroupDirective,
        FormBuilder,
        { provide: FormGroupDirective, useValue: formGroupDirective },
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserHouseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
