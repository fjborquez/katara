import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from '../user-profile.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userProfileService: UserProfileService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [ UserProfileComponent, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: () => 1
            }
          }
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userProfileService = fixture.debugElement.injector.get(UserProfileService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new user profile when onSubmit() is executed', waitForAsync(() => {
    spyOn(userProfileService, 'add').and.callFake(() => {
      return of();
    });

    component.onSubmit();
    expect(userProfileService.add).toHaveBeenCalled();
  }));

  it('should not add a new user profile when onSubmit() is executed', waitForAsync(() => {
    spyOn(userProfileService, 'add').and.callFake(() => {
      return throwError({
          error: {
              message: 'Error'
          }
      });
  });

  component.onSubmit();
  expect(userProfileService.add).toHaveBeenCalled();
  }));
});
