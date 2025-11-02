import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';

import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import { EditResponse } from 'src/app/models/edit-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    standalone: true,
    imports: [
      RouterLink,
      MatTableModule,
      DatePipe,
      CommonModule,
      MatProgressBar
    ]
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  dataSource = new MatTableDataSource<User>();
  columnsToDisplay = ['id', 'fullname', 'date_of_birth', 'email', 'options', 'nutritional_profile'];
  foodWastePercentage: number = 0;

  constructor() {
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
    return this.userService.list().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource<User>(response.message.items);
      this.foodWastePercentage = response.message.statistics.food_waste_percentage;
    });
  }

  foodWasteColor(percentage: number): string {
    if (percentage > 30) {
      return 'critical';
    } else if( percentage > 20) {
      return 'high';
    } else if( percentage > 10) {
      return 'moderate';
    } else if (percentage > 0) {
      return 'low';
    } else {
      return 'optimal';
    }
  }
}
