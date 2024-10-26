import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseInventoryViewComponent } from './house-inventory-view.component';

describe('HouseInventoryViewComponent', () => {
  let component: HouseInventoryViewComponent;
  let fixture: ComponentFixture<HouseInventoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseInventoryViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseInventoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
