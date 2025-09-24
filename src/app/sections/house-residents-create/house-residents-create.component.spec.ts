import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseResidentsCreateComponent } from './house-residents-create.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppModule } from 'src/app/app.module';

describe('HouseResidentsCreateComponent', () => {
  let component: HouseResidentsCreateComponent;
  let fixture: ComponentFixture<HouseResidentsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [HouseResidentsCreateComponent],
    imports: [MatSnackBarModule,
        RouterModule.forRoot([]),
        AppModule],
    providers: [provideHttpClient(withInterceptorsFromDi())]
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
