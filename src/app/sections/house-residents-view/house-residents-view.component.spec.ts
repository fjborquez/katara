import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { HouseResidentsViewComponent } from './house-residents-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

describe('HouseResidentsViewComponent', () => {
  let component: HouseResidentsViewComponent;
  let fixture: ComponentFixture<HouseResidentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        HouseResidentsViewComponent,
        RouterModule.forRoot([]),
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
