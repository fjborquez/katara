import { HouseService } from './../house.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PersonHouseService } from '../person-house.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-person-house-create',
  templateUrl: './person-house-create.component.html',
  styleUrls: ['./person-house-create.component.sass']
})
export class PersonHouseCreateComponent {
  personHouseForm = this.formBuilder.group({
    house_id: '',
    is_default: '',
  });
  houses: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private houseService: HouseService,
    private personHouseService: PersonHouseService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.houseService.list().subscribe((houses: any) => this.houses = houses);
  }

  onSubmit(): void {
    let params: any = {
      houses: {}
    };
    const personId: number = Number(this.route.snapshot.paramMap.get('id'));

    if (this.personHouseForm.value.house_id) {
      params['houses'][this.personHouseForm.value.house_id] = {
        'is_default': Boolean(this.personHouseForm.value.is_default)
      }
    }

    this.personHouseService.add(personId, params).subscribe(() => {
      this.router.navigate(['/persons']).then(() => {
        this.snackBar.open("House attached to person", "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });
  }

}
