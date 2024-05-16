import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { UserHousesService } from 'src/app/services/user-houses.service';

@Component({
  selector: 'app-user-house-update',
  templateUrl: './user-house-update.component.html',
  styleUrls: ['./user-house-update.component.sass']
})
export class UserHouseUpdateComponent {
  userHouseForm = this.formBuilder.group({});
  cities: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private userHousesService: UserHousesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userHouseForm.addControl('description', new FormControl(''));
    this.userHouseForm.addControl('city_id', new FormControl(''));
    this.userHouseForm.addControl('is_default', new FormControl(false));

    const userId: Number = Number(this.activatedRoute.snapshot.params['id']);
    this.cityService.list().subscribe((data: any) => this.cities = data);
    this.userHousesService.getHousesByUser(userId).subscribe((data: any) => {
      const house = data.find((item: any) => Number(item.id) === Number(this.activatedRoute.snapshot.params['idHouse']));
      const params = {
        description: house.description,
        city_id: house.city_id,
        is_default: house.pivot.is_default
      };
      this.userHouseForm.patchValue(params);
    });
  }

  onSubmit(): void {
    const userId: Number = Number(this.activatedRoute.snapshot.params['id']);
    this.userHousesService.add(userId, this.userHouseForm.value).subscribe((response: any) => {
      this.router.navigate(['/users', userId, 'houses']).then(() => {
        this.snackBar.open(response.message, "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });
  }

}
