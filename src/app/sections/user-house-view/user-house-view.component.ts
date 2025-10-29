import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';
import { CommonModule } from '@angular/common';
import { EditResponse } from 'src/app/models/edit-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { House } from 'src/app/models/house.model';
import { ListResponse } from 'src/app/models/list-response.model';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserHousesService } from 'src/app/services/user-houses.service';

@Component({
    selector: 'app-user-house-view',
    templateUrl: './user-house-view.component.html',
    styleUrls: ['./user-house-view.component.scss'],
    standalone: true,
    imports: [
      RouterLink,
      MatTableModule,
      MatIconModule,
      RouterLink,
      CommonModule,
      MatProgressBarModule
    ]
})
export class UserHouseViewComponent implements OnInit {
  private userHousesService = inject(UserHousesService);
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  dataSource = new MatTableDataSource();
  columnsToDisplay = ['house', 'city', 'is_default', 'options', 'residents', 'food_waste'];
  idUser = 0;

  ngOnInit(): void {
    this.idUser = Number(this.activatedRoute.snapshot.params['id']);
    this.getHousesList(this.idUser);
  }

  getHousesList(idUser: number) {
    return this.userHousesService.getHousesByUser(idUser).subscribe((response: ListResponse<House>) => {
      this.dataSource.data = response.message;
    });
  }

  enable(idHouse: number) {
    const message = 'Are you sure of enable this house?';
    const dialogData = {
      'title': 'Enable House',
      'message': message,
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userHousesService.enable(this.idUser, idHouse).subscribe((response: EditResponse) => {
          this.snackBar.open(response.message, 'Close');
          this.getHousesList(this.idUser);
        },
        (response: ErrorResponse) => {
          this.snackBar.open(response.error.message, "Close");
        });
      }
    });
  }

  disable(idHouse: number) {
    const message = 'Are you sure of disable this house?';
    const dialogData = {
      'title': 'Disable House',
      'message': message,
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userHousesService.disable(this.idUser, idHouse).subscribe((response: EditResponse) => {
          this.snackBar.open(response.message, 'Close');
          this.getHousesList(this.idUser);
        },
        (errorResponse: ErrorResponse) => {
          this.snackBar.open(errorResponse.error.message, "Close");
        });
      }
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
