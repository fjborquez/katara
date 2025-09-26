import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserCreateComponent } from './user-create.component';
import { provideRouter } from '@angular/router';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCreateComponent, MatSnackBarModule],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
