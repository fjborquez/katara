import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UserHousesService } from 'src/app/services/user-houses.service';

@Component({
  selector: 'app-user-house-view',
  templateUrl: './user-house-view.component.html',
  styleUrls: ['./user-house-view.component.sass']
})
export class UserHouseViewComponent {
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['house', 'city', 'is_default', 'options', 'residents'];

  constructor(
    private userHousesService: UserHousesService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const idUser = Number(this.activatedRoute.snapshot.params['id']);
    this.getHousesList(idUser);
  }

  getHousesList(idUser: Number) {
    return this.userHousesService.getHousesByUser(idUser).subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
}
