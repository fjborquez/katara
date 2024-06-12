import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalProfileComponent } from './nutritional-profile.component';

describe('NutritionalProfileComponent', () => {
  let component: NutritionalProfileComponent;
  let fixture: ComponentFixture<NutritionalProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionalProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
