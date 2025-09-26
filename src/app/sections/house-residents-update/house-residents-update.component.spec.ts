import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { HouseResidentsUpdateComponent } from './house-residents-update.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

describe('HouseResidentsUpdateComponent', () => {
  let component: HouseResidentsUpdateComponent;
  let fixture: ComponentFixture<HouseResidentsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseResidentsUpdateComponent, RouterModule.forRoot([]), MatSnackBarModule],
      providers: [provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();

    fixture = TestBed.createComponent(HouseResidentsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
