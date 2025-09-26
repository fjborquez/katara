import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';
import { EditResponse } from 'src/app/models/edit-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { ListResponse } from 'src/app/models/list-response.model';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Resident } from 'src/app/models/resident.model';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
    selector: 'app-house-residents-view',
    templateUrl: './house-residents-view.component.html',
    styleUrls: ['./house-residents-view.component.sass'],
    standalone: true,
    imports: [
      RouterLink,
      MatTableModule,
      DatePipe,
      MatIconModule,
      CommonModule
    ]
})
export class HouseResidentsViewComponent implements OnInit {
  private residentService = inject(ResidentService);
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  dataSource = new MatTableDataSource();
  columnsToDisplay = ['fullname', 'date_of_birth', 'options', 'nutritional_profile'];
  idUser = 0;
  idHouse = 0;

  ngOnInit(): void {
    this.idUser = Number(this.activatedRoute.snapshot.params['id']);
    this.idHouse = Number(this.activatedRoute.snapshot.params['idHouse']);
    this.getResidentList();
  }

  getResidentList() {
    return this.residentService.list(this.idUser, this.idHouse).subscribe((response: ListResponse<Resident>) => {
      this.dataSource.data = response.message;
    });
  }

  delete(idResident: number): void {
    const message = 'Are you sure of delete this resident?';
    const dialogData = {
      'title': 'Delete resident',
      'message': message,
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.residentService.delete(this.idUser, this.idHouse, idResident).subscribe((response: EditResponse) => {
          this.snackBar.open(response.message, 'Close');
          this.getResidentList();
        },
        (response: ErrorResponse) => {
          this.snackBar.open(response.error.message, "Close");
        });
      }
    });
  }
}
