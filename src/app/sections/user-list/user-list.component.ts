import { Component } from '@angular/core';
import { ConfirmUserDeleteComponent } from '../../components/confirm-user-delete/confirm-user-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PersonsService } from '../../services/persons.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent {
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['id', 'name', 'lastname', 'date_of_birth', 'email', 'options', 'nutritional_profile'];

  constructor(
    private personService: PersonsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
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
        this.personService.enable(userId).subscribe((_: any) => {
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
        this.personService.disable(userId).subscribe((_: any) => {
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