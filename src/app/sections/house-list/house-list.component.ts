import { HouseService } from '../../services/house.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.sass']
})
export class HouseListComponent {
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['id', 'description', 'city', 'options'];

  constructor(
    private houseService: HouseService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    public userService: UserService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.getHouseList();
  }

  getHouseList() {
    return this.houseService.list().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }
}
