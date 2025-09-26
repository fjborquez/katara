import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { UserHouseViewComponent } from './user-house-view.component';

describe('UserHouseViewComponent', () => {
  let component: UserHouseViewComponent;
  let fixture: ComponentFixture<UserHouseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserHouseViewComponent,
        RouterModule.forRoot([]),
        MatSnackBarModule,
        MatDialogModule,
        MatTableModule,
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserHouseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
