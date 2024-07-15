import { ActivatedRoute, Router } from '@angular/router';

import { City } from '../../models/city.model';
import { CityService } from './../../services/city.service';
import { Component } from '@angular/core';
import { CreateResponse } from 'src/app/models/create-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { FormBuilder } from '@angular/forms';
import { ListResponse } from 'src/app/models/list-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserHousesService } from 'src/app/services/user-houses.service';

@Component({
  selector: 'app-user-house-create',
  templateUrl: './user-house-create.component.html',
  styleUrls: ['./user-house-create.component.sass']
})
export class UserHouseCreateComponent {
  userHouseForm = this.formBuilder.group({
    description: '',
    city_id: '',
    is_default: 0
  });
  userId = 0;
  cities: City[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private userHousesService: UserHousesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cityService.list().subscribe((response: ListResponse<City>) => this.cities = response.message);
    this.userId = this.activatedRoute.snapshot.params['id'];
  }

  onSubmit(): void {
    this.userHousesService.add(this.userId, this.userHouseForm.value).subscribe((response: CreateResponse) => {
      this.router.navigate(['/users', this.userId, 'houses']).then(() => {
        this.snackBar.open(response.message, "Close");
      });
    },
    (error: ErrorResponse) => {
      this.snackBar.open(error.message, "Close");
    });
  }
}
