import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ListResponse } from 'src/app/models/list-response.model';
import { MatTableDataSource } from '@angular/material/table';
import { Resident } from 'src/app/models/resident.model';
import { ResidentService } from 'src/app/services/resident.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';
import { EditResponse } from 'src/app/models/edit-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';

@Component({
  selector: 'app-house-residents-view',
  templateUrl: './house-residents-view.component.html',
  styleUrls: ['./house-residents-view.component.sass']
})
export class HouseResidentsViewComponent {
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['fullname', 'date_of_birth', 'options', 'nutritional_profile'];
  idUser = 0;
  idHouse = 0;

  constructor(
    private residentService: ResidentService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

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
        (error: ErrorResponse) => {
          this.snackBar.open(error.message, 'Close');
        });
      }
    });
  }
}
