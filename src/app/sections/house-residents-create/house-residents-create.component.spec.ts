import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseResidentsCreateComponent } from './house-residents-create.component';

describe('HouseResidentsCreateComponent', () => {
  let component: HouseResidentsCreateComponent;
  let fixture: ComponentFixture<HouseResidentsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseResidentsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseResidentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
