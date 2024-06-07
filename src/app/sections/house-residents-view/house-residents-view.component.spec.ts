import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseResidentsViewComponent } from './house-residents-view.component';

describe('HouseResidentsViewComponent', () => {
  let component: HouseResidentsViewComponent;
  let fixture: ComponentFixture<HouseResidentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseResidentsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseResidentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
