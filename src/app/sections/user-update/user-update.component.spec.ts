import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateComponent } from './user-update.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NutritionalProfileComponent } from '../../components/nutritional-profile/nutritional-profile.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserUpdateComponent,
        NutritionalProfileComponent
      ],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        MatTableModule,
        MatSelectModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
