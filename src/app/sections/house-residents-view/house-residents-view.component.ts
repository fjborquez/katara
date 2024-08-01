import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ListResponse } from 'src/app/models/list-response.model';
import { MatTableDataSource } from '@angular/material/table';
import { Resident } from 'src/app/models/resident.model';
import { ResidentService } from 'src/app/services/resident.service';

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
}
