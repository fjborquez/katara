import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateComponent } from './user-create.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppModule } from 'src/app/app.module';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [UserCreateComponent],
    imports: [MatSnackBarModule,
        AppModule],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
    .compileComponents();

    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
