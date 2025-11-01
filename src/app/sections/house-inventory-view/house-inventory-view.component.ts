import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';
import { EditResponse } from 'src/app/models/edit-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { Inventory } from 'src/app/models/inventory.model';
import { InventoryHousesService } from './../../services/inventory-houses.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-house-inventory-view',
    templateUrl: './house-inventory-view.component.html',
    styleUrls: ['./house-inventory-view.component.sass'],
    standalone: true,
    imports: [
      RouterLink,
      MatTableModule,
      DecimalPipe,
      DatePipe,
      MatIconModule,
      CommonModule
    ]
})
export class HouseInventoryViewComponent implements OnInit {
  private inventoryHousesService = inject(InventoryHousesService);
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  dataSource = new MatTableDataSource();
  columnsToDisplay = ['increment', 'quantity', 'brand', 'product', 'purchase_date', 'expiration_date', 'status_icon', 'options'];
  userId = 0;
  houseId = 0;

  ngOnInit(): void {
    this.userId = Number(this.activatedRoute.snapshot.params['id']);
    this.houseId = Number(this.activatedRoute.snapshot.params['idHouse']);
    this.getInventoryByHouseList(this.userId, this.houseId);
  }

  getInventoryByHouseList(idUser: number, idHouse: number) {
    return this.inventoryHousesService.getHousesByUser(idUser, idHouse).subscribe((response: any) => {
      this.dataSource.data = response.message.items;
    }, (response: ErrorResponse) => this.snackBar.open(response.error.message, 'Close'));
  }

  isExpirated(inventory: Inventory) {
    return new Date() > new Date(inventory.expiration_date);
  }

  discard(userId: number, houseId: number, inventory: any) {
    const message = `Are you sure of discard ${inventory.quantity} ${inventory.uom_abbreviation} of ${inventory.catalog_description}?`;
    const title = 'Discard inventory product';
    const dialogData = {
      message: message,
      title: title
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.inventoryHousesService.discard<EditResponse>(userId, houseId, inventory.id).subscribe((response: EditResponse) => {
          this.snackBar.open(response.message, 'Close');
          this.getInventoryByHouseList(this.userId, this.houseId);
        },
        (error: ErrorResponse) => {
          this.snackBar.open(error.error.message, 'Close');
        });
      }
    });
  }

  consume(userId: number, houseId: number, inventory: any) {
    const message = `Are you sure of consume ${inventory.quantity} ${inventory.uom_abbreviation} of ${inventory.catalog_description}?`;
    const title = 'Consume inventory product';
    const dialogData = {
      message: message,
      title: title
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.inventoryHousesService.consume<EditResponse>(userId, houseId, inventory.id).subscribe((response: EditResponse) => {
          this.snackBar.open(response.message, 'Close');
          this.getInventoryByHouseList(this.userId, this.houseId);
        },
        (error: ErrorResponse) => {
          this.snackBar.open(error.error.message, 'Close');
        });
      }
    });
  }

  isConsumable(inventory: any) {
    const currentState = inventory.product_status.find((product: any) => product.pivot.is_active);
    if (currentState) {
      return currentState.id === 1 || currentState.id === 2;
    } else {
      return false;
    }
  }

}
