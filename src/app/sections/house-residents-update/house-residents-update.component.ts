import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

import { EditResponse } from 'src/app/models/edit-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { GetResponse } from 'src/app/models/get-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NutritionalProfileDetail } from 'src/app/models/nutritional-profile-detail.model';
import { Resident } from 'src/app/models/resident.model';
import { ResidentService } from 'src/app/services/resident.service';
import { dateToChileanFormat } from 'src/app/functions/dateToChileanFormat';

@Component({
    selector: 'app-house-residents-update',
    templateUrl: './house-residents-update.component.html',
    styleUrls: ['./house-residents-update.component.sass'],
    standalone: false
})
export class HouseResidentsUpdateComponent implements OnInit {
  userId = 0;
  houseId = 0;
  residentId = 0;
  houseResidentForm = this.formBuilder.group({
    name: new FormControl(''),
    lastname: new FormControl(''),
    date_of_birth: new FormControl(''),
    nutritionalProfile: new FormArray([])
  });
  nutritionalProfile: NutritionalProfileDetail[] = [];

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

    this.residentService.get(this.userId, this.houseId, this.residentId).subscribe((response: GetResponse<Resident>) => {
      const resident: Resident = response.message;
      this.houseResidentForm.get('name')?.patchValue(resident.name);
      this.houseResidentForm.get('lastname')?.patchValue(resident.lastname);
      this.houseResidentForm.get('date_of_birth')?.patchValue(resident.date_of_birth);

      this.nutritionalProfile = resident.nutritional_profile;
    });
  }

  onSubmit(): void {
    const date = dateToChileanFormat(this.houseResidentForm.get('date_of_birth')?.value || '');

    const params = {
      name: this.houseResidentForm.get('name')?.value,
      lastname: this.houseResidentForm.get('lastname')?.value,
      date_of_birth: date,
      nutritionalProfile: this.houseResidentForm.get('nutritionalProfile')?.value
    };

    this.residentService.update<EditResponse>(this.userId, this.houseId, this.residentId, params).subscribe((response: EditResponse) => {
      this.router.navigate(['/users/', this.userId, 'houses', this.houseId, 'residents']).then(() => {
        this.snackBar.open(response.message, "Close");
      });
    },
    (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });

  }
}
