import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHouseUpdateComponent } from './person-house-update.component';

describe('PersonHouseUpdateComponent', () => {
  let component: PersonHouseUpdateComponent;
  let fixture: ComponentFixture<PersonHouseUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonHouseUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonHouseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
