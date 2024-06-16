import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseResidentsUpdateComponent } from './house-residents-update.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppModule } from 'src/app/app.module';

describe('HouseResidentsUpdateComponent', () => {
  let component: HouseResidentsUpdateComponent;
  let fixture: ComponentFixture<HouseResidentsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseResidentsUpdateComponent ],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),
        MatSnackBarModule,
        AppModule
      ]
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
