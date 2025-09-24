import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { HouseInventoryViewComponent } from './house-inventory-view.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { InventoryHousesService } from '../../services/inventory-houses.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HouseInventoryViewComponent', () => {
  let component: HouseInventoryViewComponent;
  let fixture: ComponentFixture<HouseInventoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [HouseInventoryViewComponent],
    imports: [MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        RouterTestingModule,
        MatDialogModule],
    providers: [HouseInventoryViewComponent, {
            provide: ActivatedRoute,
            useValue: {
                snapshot: {
                    params: {
                        'id': '1'
                    }
                }
            }
        }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
