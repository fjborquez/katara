import { CityService } from './../../services/city.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  userId: number = 0;
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
    this.cityService.list().subscribe((data: any) => this.cities = data);
    this.userId = this.activatedRoute.snapshot.params['id'];
  }

  onSubmit(): void {
    this.userHousesService.add(this.userId, this.userHouseForm.value).subscribe((response: any) => {
      this.router.navigate(['/users', this.userId, 'houses']).then(() => {
        this.snackBar.open(response.message, "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });
  }
}
