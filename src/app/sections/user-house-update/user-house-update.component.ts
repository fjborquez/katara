import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';
import { CommonModule } from '@angular/common';
import { EditResponse } from 'src/app/models/edit-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { House } from 'src/app/models/house.model';
import { ListResponse } from 'src/app/models/list-response.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserHousesService } from 'src/app/services/user-houses.service';

@Component({
    selector: 'app-user-house-update',
    templateUrl: './user-house-update.component.html',
    styleUrls: ['./user-house-update.component.sass'],
    standalone: true,
    imports: [
      MatSelectModule,
      RouterLink,
      CommonModule,
      ReactiveFormsModule,
      MatButtonModule
    ]
})
export class UserHouseUpdateComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private cityService = inject(CityService);
  private userHousesService = inject(UserHousesService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  userHouseForm = this.formBuilder.group({});
  cities: City[] = [];
  userId = 0;
  houseId = 0;

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.userHouseForm.addControl('description', new FormControl(''));
    this.userHouseForm.addControl('city_id', new FormControl(''));
    this.userHouseForm.addControl('is_default', new FormControl(false));

    this.userId = Number(this.activatedRoute.snapshot.params['id']);
    this.houseId = Number(this.activatedRoute.snapshot.params['idHouse']);
    this.cityService.list().subscribe((response: ListResponse<City>) => this.cities = response.message);
    this.userHousesService.getHousesByUser(this.userId).subscribe((response: ListResponse<House>) => {
      const house = response.message.find((item: House) => Number(item.id) === this.houseId);

      if (house) {
        const params = {
          description: house.description,
          city_id: house.city_id,
          is_default: house.pivot.is_default
        };
        this.userHouseForm.patchValue(params);
      }
    });
  }

  onSubmit(): void {
    const params: any = this.userHouseForm.value;
    params.house_id = Number(this.activatedRoute.snapshot.params['idHouse']);

    this.userHousesService.updateHousesByUser<EditResponse>(this.userId, params).subscribe((response: EditResponse) => {
      this.router.navigate(['/users', this.userId, 'houses']).then(() => {
        this.snackBar.open(response.message, "Close");
      });
    },
    (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });
  }

}
