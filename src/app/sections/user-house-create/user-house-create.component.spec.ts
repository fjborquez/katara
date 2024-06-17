import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHouseCreateComponent } from './user-house-create.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

describe('UserHouseCreateComponent', () => {
  let component: UserHouseCreateComponent;
  let fixture: ComponentFixture<UserHouseCreateComponent>;

  const formGroupDirective = new FormGroupDirective([], []);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHouseCreateComponent ],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),
        MatSnackBarModule,
        MatSelectModule,
        ReactiveFormsModule,
      ],
      providers: [
        FormGroupDirective,
        FormBuilder,
        {provide: FormGroupDirective, useValue: formGroupDirective}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHouseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
