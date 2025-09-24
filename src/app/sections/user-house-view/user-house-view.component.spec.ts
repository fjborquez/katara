import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHouseViewComponent } from './user-house-view.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material/table';

describe('UserHouseViewComponent', () => {
  let component: UserHouseViewComponent;
  let fixture: ComponentFixture<UserHouseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        UserHouseViewComponent,
    ],
    imports: [RouterModule.forRoot([]),
        MatSnackBarModule,
        MatDialogModule,
        RouterTestingModule,
        MatTableModule],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
    .compileComponents();

    fixture = TestBed.createComponent(UserHouseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
