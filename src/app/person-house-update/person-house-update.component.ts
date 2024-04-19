import { HouseService } from './../house.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PersonHouseService } from '../person-house.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-person-house-update',
  templateUrl: './person-house-update.component.html',
  styleUrls: ['./person-house-update.component.sass']
})
export class PersonHouseUpdateComponent {
  personHouseForm: FormGroup  = this.formBuilder.group({});
  houses: any = [];
  housesByPerson: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private houseService: HouseService,
    private personHouseService: PersonHouseService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const personId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.houseService.list().subscribe((houses: any) => this.houses = houses);
    this.personHouseService.getHousesByPerson(personId).subscribe((housesByPerson: any) => {
      this.housesByPerson = housesByPerson;
      this.housesByPerson.forEach((house: any) => {
        this.personHouseForm.addControl('house_id-'+house.id, new FormControl(house.id));
        this.personHouseForm.addControl('is_default-'+house.id, new FormControl(house.pivot.is_default == 1));
      });
    });
  }

  isDefaultOnClick(e: any): void {
    this.housesByPerson.forEach((house: any) => {
      if (e.target.id.includes(house.id)) {
        this.personHouseForm.controls['is_default-'+house.id].setValue(true);
      } else {
        this.personHouseForm.controls['is_default-'+house.id].setValue(false);
      }
    });
  }

  onSubmit(): void {
  }

}
