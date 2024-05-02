import { CityService } from '../../services/city.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HouseService } from '../../services/house.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-house-update',
  templateUrl: './house-update.component.html',
  styleUrls: ['./house-update.component.sass']
})
export class HouseUpdateComponent {
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
    private cityService: CityService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    let houseId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.cityService.list().subscribe((cities: any) => this.cities = cities);
    this.houseService.get(houseId).subscribe((house: any) => {
      this.houseForm.patchValue(house);
    });
  }

  onSubmit(): void {
    let houseId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.houseService.update(houseId, this.houseForm.value).subscribe(() => {
      this.router.navigate(['/houses']).then(() => {
        this.snackBar.open("House updated", "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });
  }
}
