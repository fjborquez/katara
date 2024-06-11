import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseResidentsUpdateComponent } from './house-residents-update.component';

describe('HouseResidentsUpdateComponent', () => {
  let component: HouseResidentsUpdateComponent;
  let fixture: ComponentFixture<HouseResidentsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseResidentsUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseResidentsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
