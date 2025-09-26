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

import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NutritionalProfileComponent } from './nutritional-profile.component';

describe('NutritionalProfileComponent', () => {
  let component: NutritionalProfileComponent;
  let fixture: ComponentFixture<NutritionalProfileComponent>;

  const fb = new FormBuilder();
  const formGroupDirective = new FormGroupDirective([], []);
  formGroupDirective.form = fb.group({
    test: fb.control(null),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NutritionalProfileComponent,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatTableModule,
      ],
      providers: [
        FormGroupDirective,
        FormBuilder,
        { provide: FormGroupDirective, useValue: formGroupDirective },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 1 } } },
        },
        provideHttpClient(withInterceptorsFromDi()),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NutritionalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
