import { ActivatedRoute, provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { HouseInventoryViewComponent } from './house-inventory-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('HouseInventoryViewComponent', () => {
  let component: HouseInventoryViewComponent;
  let fixture: ComponentFixture<HouseInventoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HouseInventoryViewComponent,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatDialogModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: '1',
              },
            },
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HouseInventoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
