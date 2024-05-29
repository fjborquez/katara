import { ConfirmUserDeleteComponent } from './../../components/confirm-user-delete/confirm-user-delete.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UserHousesService } from 'src/app/services/user-houses.service';

@Component({
  selector: 'app-user-house-view',
  templateUrl: './user-house-view.component.html',
  styleUrls: ['./user-house-view.component.sass']
})
export class UserHouseViewComponent {
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['house', 'city', 'is_default', 'options', 'residents'];
  idUser: number = 0;

  constructor(
    private userHousesService: UserHousesService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.idUser = Number(this.activatedRoute.snapshot.params['id']);
    this.getHousesList(this.idUser);
  }

  getHousesList(idUser: Number) {
    return this.userHousesService.getHousesByUser(idUser).subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  enable(idHouse: number) {
    const userId = this.activatedRoute.snapshot.params['id'];

    const message = 'Are you sure of enable this house?';
    const dialogData = {
      'title': 'Enable House',
      'message': message,
    };
    const dialogRef = this.dialog.open(ConfirmUserDeleteComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userHousesService.enable(userId, idHouse).subscribe((_: any) => {
          this.snackBar.open('House enabled', 'Close');
          this.getHousesList(userId);
        },
        (error) => {
          this.snackBar.open(error.error.message, 'Close');
        });
      }
    });
  }

  disable(idHouse: number) {
    const userId = this.activatedRoute.snapshot.params['id'];

    return this.userHousesService.disable(this.idUser, idHouse).subscribe((response: any) => {
      const message = 'Are you sure of disable this house?';
      const dialogData = {
        'title': 'Disable House',
        'message': message,
      };
      const dialogRef = this.dialog.open(ConfirmUserDeleteComponent, {
        maxWidth: "400px",
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.userHousesService.disable(userId, idHouse).subscribe((_: any) => {
            this.snackBar.open('House disabled', 'Close');
            this.getHousesList(userId);
          },
          (error) => {
            this.snackBar.open(error.error.message, 'Close');
          });
        }
      });
    })
  }
}
