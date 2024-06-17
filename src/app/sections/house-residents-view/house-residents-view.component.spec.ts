import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseResidentsViewComponent } from './house-residents-view.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

describe('HouseResidentsViewComponent', () => {
  let component: HouseResidentsViewComponent;
  let fixture: ComponentFixture<HouseResidentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseResidentsViewComponent ],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),
        MatTableModule
      ],
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
