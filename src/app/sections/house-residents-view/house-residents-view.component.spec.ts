import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseResidentsViewComponent } from './house-residents-view.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('HouseResidentsViewComponent', () => {
  let component: HouseResidentsViewComponent;
  let fixture: ComponentFixture<HouseResidentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [HouseResidentsViewComponent],
    imports: [RouterModule.forRoot([]),
        MatTableModule,
        MatSnackBarModule,
        MatDialogModule],
    providers: [provideHttpClient(withInterceptorsFromDi())]
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
