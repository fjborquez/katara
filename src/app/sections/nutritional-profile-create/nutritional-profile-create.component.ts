import { Component } from '@angular/core';
import { ConfirmUserDeleteComponent } from '../../components/confirm-user-delete/confirm-user-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PersonsService } from '../../services/persons.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent {
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['id', 'name', 'lastname', 'email', 'options'];

  constructor(
    private personsService: PersonsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.getUserList();
  }

  enable(userId: Number) {
    const message = 'Are you sure of enable this user?';
    const dialogData = {
      'title': 'Enable User',
      'message': message,
    };
    const dialogRef = this.dialog.open(ConfirmUserDeleteComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personsService.enable(userId).subscribe((_: any) => {
          this.snackBar.open('User enabled', 'Close');
          this.getUserList();
        },
        (error) => {
          this.snackBar.open(error.error.message, 'Close');
        });
      }
    });
  }

  disable(userId: Number) {
    const message = 'Are you sure of disable this user?';
    const dialogData = {
      'title': 'Disable User',
      'message': message,
    };
    const dialogRef = this.dialog.open(ConfirmUserDeleteComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personsService.disable(userId).subscribe((_: any) => {
          this.snackBar.open('User disabled', 'Close');
          this.getUserList();
        },
        (error) => {
          this.snackBar.open(error.error.message, 'Close');
        });
      }
    });
  }

  getUserList() {
    return this.personsService.list().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }
}
