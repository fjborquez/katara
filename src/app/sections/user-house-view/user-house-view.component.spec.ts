import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHouseViewComponent } from './user-house-view.component';

describe('UserHouseViewComponent', () => {
  let component: UserHouseViewComponent;
  let fixture: ComponentFixture<UserHouseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHouseViewComponent ]
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
