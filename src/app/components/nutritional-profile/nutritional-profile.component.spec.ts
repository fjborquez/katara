import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalProfileComponent } from './nutritional-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

describe('NutritionalProfileComponent', () => {
  let component: NutritionalProfileComponent;
  let fixture: ComponentFixture<NutritionalProfileComponent>;

  const fb = new FormBuilder()
  const formGroupDirective = new FormGroupDirective([], []);
  formGroupDirective.form = fb.group({
    test: fb.control(null)
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatTableModule
      ],
      providers: [
        FormGroupDirective,
        FormBuilder,
        {provide: FormGroupDirective, useValue: formGroupDirective}
      ],
      declarations: [ NutritionalProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
