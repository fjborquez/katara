import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseInventoryUpdateComponent } from './house-inventory-update.component';

describe('HouseInventoryUpdateComponent', () => {
  let component: HouseInventoryUpdateComponent;
  let fixture: ComponentFixture<HouseInventoryUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseInventoryUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseInventoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
