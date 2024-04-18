import { Component } from '@angular/core';
import { ConfirmUserDeleteComponent } from '../confirm-user-delete/confirm-user-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PersonsService } from '../persons.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.sass']
})
export class PersonListComponent {
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['id', 'name', 'lastname', 'date_of_birth', 'email', 'user', 'nutritional_profile', 'houses', 'options'];

  constructor(
    private personService: PersonsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    public userService: UserService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.getPersonList();
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
        this.userService.enable(userId).subscribe((_: any) => {
          this.snackBar.open('User enabled', 'Close');
          this.getPersonList();
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
        this.userService.disable(userId).subscribe((_: any) => {
          this.snackBar.open('User disabled', 'Close');
          this.getPersonList();
        },
        (error) => {
          this.snackBar.open(error.error.message, 'Close');
        });
      }
    });
  }

  getPersonList() {
    return this.personService.list().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }
}
