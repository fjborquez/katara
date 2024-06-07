import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-house-residents-view',
  templateUrl: './house-residents-view.component.html',
  styleUrls: ['./house-residents-view.component.sass']
})
export class HouseResidentsViewComponent {
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['fullname', 'date_of_birth', 'options', 'nutritional_profile'];
  idUser: number = 0;
  idHouse: number = 0;

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
    return this.residentService.list(this.idHouse, this.idUser).subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
}
