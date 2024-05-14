import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHouseCreateComponent } from './user-house-create.component';

describe('UserHouseCreateComponent', () => {
  let component: UserHouseCreateComponent;
  let fixture: ComponentFixture<UserHouseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHouseCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHouseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
