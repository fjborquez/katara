import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule } from '@angular/material/select';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseInventoryViewComponent } from './house-inventory-view.component';
import { InventoryHousesService } from '../../services/inventory-houses.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

describe('HouseInventoryViewComponent', () => {
  let component: HouseInventoryViewComponent;
  let fixture: ComponentFixture<HouseInventoryViewComponent>;
  let inventoryHousesService: InventoryHousesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseInventoryViewComponent ],
      imports: [
        HttpClientTestingModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        RouterTestingModule
      ],
      providers: [ HouseInventoryViewComponent, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            params: {
              'id': '1'
            }
          }
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseInventoryViewComponent);
    component = fixture.componentInstance;
    inventoryHousesService = fixture.debugElement.injector.get(InventoryHousesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
