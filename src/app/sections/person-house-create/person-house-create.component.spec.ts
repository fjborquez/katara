import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHouseCreateComponent } from './person-house-create.component';

describe('PersonHouseCreateComponent', () => {
  let component: PersonHouseCreateComponent;
  let fixture: ComponentFixture<PersonHouseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonHouseCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonHouseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
