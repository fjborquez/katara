import { CityService } from './../city.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HouseService } from '../house.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-house-create',
  templateUrl: './house-create.component.html',
  styleUrls: ['./house-create.component.sass']
})
export class HouseCreateComponent {
  houseForm = this.formBuilder.group({
    description: '',
    city_id: '',
  });
  cities: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private houseService: HouseService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.cityService.list().subscribe((cities: any) => this.cities = cities);
  }

  onSubmit(): void {
    this.houseService.add(this.houseForm.value).subscribe(() => {
      this.router.navigate(['/']).then(() => {
        this.snackBar.open("House added", "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });
  }
}
