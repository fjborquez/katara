import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHouseUpdateComponent } from './user-house-update.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

describe('UserHouseUpdateComponent', () => {
  let component: UserHouseUpdateComponent;
  let fixture: ComponentFixture<UserHouseUpdateComponent>;

  const formGroupDirective = new FormGroupDirective([], []);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [UserHouseUpdateComponent],
    imports: [RouterModule.forRoot([]),
        MatSnackBarModule,
        MatSelectModule,
        ReactiveFormsModule],
    providers: [
        FormGroupDirective,
        FormBuilder,
        { provide: FormGroupDirective, useValue: formGroupDirective },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(UserHouseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
