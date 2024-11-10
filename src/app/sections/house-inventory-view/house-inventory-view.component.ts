import { MatSnackBar } from '@angular/material/snack-bar';
import { InventoryHousesService } from './../../services/inventory-houses.service';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Inventory } from 'src/app/models/inventory.model';
import { ListResponse } from 'src/app/models/list-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';

@Component({
  selector: 'app-house-inventory-view',
  templateUrl: './house-inventory-view.component.html',
  styleUrls: ['./house-inventory-view.component.sass']
})
export class HouseInventoryViewComponent {
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['quantity', 'brand', 'product', 'purchase_date', 'expiration_date'];
  userId = 0;
  houseId = 0;

  constructor(
    private inventoryHousesService: InventoryHousesService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.activatedRoute.snapshot.params['id']);
    this.houseId = Number(this.activatedRoute.snapshot.params['idHouse']);
    this.getInventoryByHouseList(this.userId, this.houseId);
  }


  getInventoryByHouseList(idUser: number, idHouse: number) {
    return this.inventoryHousesService.getHousesByUser(idUser, idHouse).subscribe((response: ListResponse<Inventory>) => {
      this.dataSource.data = response.message;
    }, (response: ErrorResponse) => this.snackBar.open(response.error.message, 'Close'));
  }

  isExpirated(inventory: Inventory) {
    return new Date() > new Date(inventory.expiration_date);
  }
}
