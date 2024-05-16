import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHouseUpdateComponent } from './user-house-update.component';

describe('UserHouseUpdateComponent', () => {
  let component: UserHouseUpdateComponent;
  let fixture: ComponentFixture<UserHouseUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHouseUpdateComponent ]
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
