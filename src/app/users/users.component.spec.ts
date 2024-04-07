import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new user when onSubmit() is executed', waitForAsync(() => {
    spyOn(userService, 'add').and.callFake(() => {
        return of();
    });

    component.onSubmit();
    expect(userService.add).toHaveBeenCalled();
  }));

  it('should not add a new user when onSubmit() is executed', waitForAsync(() => {
    spyOn(userService, 'add').and.callFake(() => {
        return throwError({
            error: {
                message: 'Error'
            }
        });
    });

    component.onSubmit();
    expect(userService.add).toHaveBeenCalled();
  }));
});
