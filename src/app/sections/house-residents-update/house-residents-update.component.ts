import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { dateToChileanFormat } from 'src/app/functions/dateToChileanFormat';
import { nutritionalProfileToArray } from 'src/app/functions/nutritionalProfileToArray';
import { NutritionalRestriction } from 'src/app/models/nutritional-restriction.model';
import { Resident } from 'src/app/models/resident.model';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-house-residents-update',
  templateUrl: './house-residents-update.component.html',
  styleUrls: ['./house-residents-update.component.sass']
})
export class HouseResidentsUpdateComponent {
  userId = 0;
  houseId = 0;
  residentId = 0;
  houseResidentForm = this.formBuilder.group({
    name: new FormControl(''),
    lastname: new FormControl(''),
    date_of_birth: new FormControl('')
  });
  nutritionalProfile: NutritionalRestriction[] = [];

  public constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private residentService: ResidentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.houseId = this.activatedRoute.snapshot.params['idHouse'];
    this.residentId = this.activatedRoute.snapshot.params['idResident'];

    this.residentService.get(this.userId, this.houseId, this.residentId).subscribe((resident: Resident) => {
      this.houseResidentForm.get('name')?.patchValue(resident.name);
      this.houseResidentForm.get('lastname')?.patchValue(resident.lastname);
      this.houseResidentForm.get('date_of_birth')?.patchValue(resident.date_of_birth);

      this.nutritionalProfile = resident.nutritional_profile;
    });
  }

  onSubmit(): void {
    const nutritionalProfile = nutritionalProfileToArray(this.houseResidentForm.value);
    const date = dateToChileanFormat(this.houseResidentForm.get('date_of_birth')?.value || '');

    const params = {
      name: this.houseResidentForm.get('name')?.value,
      lastname: this.houseResidentForm.get('lastname')?.value,
      date_of_birth: date,
      nutritional_profile: nutritionalProfile
    }

    this.residentService.update(this.userId, this.houseId, this.residentId, params).subscribe((response: any) => {
      this.router.navigate(['/users/', this.userId, 'houses', this.houseId, 'residents']).then(() => {
        this.snackBar.open(response.message, "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });

  }
}
