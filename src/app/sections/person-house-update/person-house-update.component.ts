import { HouseService } from '../../services/house.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PersonHouseService } from '../../services/person-house.service';
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
      this.housesByPerson.forEach((house: any, i: Number) => {
        this.personHouseForm.addControl('house[' + i + '][id]', new FormControl(house.id));
        this.personHouseForm.addControl('house[' + i + '][is_default]', new FormControl(house.pivot.is_default == 1));
      });
    });
  }

  isDefaultOnClick(e: any): void {
    this.housesByPerson.forEach((house: any, i: Number) => {
      if (e.target.id.includes(i)) {
        this.personHouseForm.controls['house[' + i + '][is_default]'].setValue(true);
      } else {
        this.personHouseForm.controls['house[' + i + '][is_default]'].setValue(false);
      }
    });
  }

  add(): void {
    this.housesByPerson.push({});
    this.personHouseForm.addControl('house[' + (this.housesByPerson.length - 1) + '][id]', new FormControl());
    this.personHouseForm.addControl('house[' + (this.housesByPerson.length - 1) + '][is_default]', new FormControl(false));
  }

  remove(i: Number): void {
    this.housesByPerson.splice(i, 1);
  }

  onSubmit(): void {
    const params: any = {
      houses: {}
    };
    let personId: number = Number(this.route.snapshot.paramMap.get('id'));

    for (let i = 0; i < Object.keys(this.personHouseForm.value).length / 2; i++) {
      params['houses'][this.personHouseForm.value['house[' + i + '][id]']] = {
        'is_default': this.personHouseForm.value['house[' + i + '][is_default]']
      };
    }

    this.personHouseService.updateHousesByPerson(personId, params).subscribe((response) => {
      this.router.navigate(['/persons']).then(() => {
        this.snackBar.open("Person and houses updated", "Close");
      },
      (error) => {
        this.snackBar.open(error.error.message, "Close");
      });
    });
  }

}
