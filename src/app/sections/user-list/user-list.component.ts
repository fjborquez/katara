import { Component, OnInit } from '@angular/core';

import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import { EditResponse } from 'src/app/models/edit-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { ListResponse } from 'src/app/models/list-response.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.sass'],
    standalone: false
})
export class UserListComponent implements OnInit {
  dataSource = new MatTableDataSource<User>();
  columnsToDisplay = ['id', 'fullname', 'date_of_birth', 'email', 'options', 'nutritional_profile'];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.getPersonList();
  }

  enable(userId: number) {
    const message = 'Are you sure of enable this user?';
    const dialogData = {
      'title': 'Enable User',
      'message': message,
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.enable<EditResponse>(userId).subscribe((response: EditResponse) => {
          this.snackBar.open(response.message, 'Close');
          this.getPersonList();
        },
        (response: ErrorResponse) => {
          this.snackBar.open(response.error.message, "Close");
        });
      }
    });
  }

  disable(userId: number) {
    const message = 'Are you sure of disable this user?';
    const dialogData = {
      'title': 'Disable User',
      'message': message,
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.disable<EditResponse>(userId).subscribe((response: EditResponse) => {
          this.snackBar.open(response.message, 'Close');
          this.getPersonList();
        },
        (errorResponse: ErrorResponse) => {
          this.snackBar.open(errorResponse.error.message, "Close");
        });
      }
    });
  }

  getPersonList(): Subscription {
    return this.userService.list().subscribe((response: ListResponse<User>) => {
      this.dataSource = new MatTableDataSource<User>(response.message);
    });
  }
}
