import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EditResponse } from 'src/app/models/edit-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { GetResponse } from 'src/app/models/get-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NutritionalProfileComponent } from 'src/app/components/nutritional-profile/nutritional-profile.component';
import { NutritionalProfileDetail } from 'src/app/models/nutritional-profile-detail.model';
import { Resident } from 'src/app/models/resident.model';
import { ResidentService } from 'src/app/services/resident.service';
import { dateToChileanFormat } from 'src/app/functions/dateToChileanFormat';

@Component({
    selector: 'app-house-residents-update',
    templateUrl: './house-residents-update.component.html',
    styleUrls: ['./house-residents-update.component.sass'],
    standalone: true,
    imports: [
      NutritionalProfileComponent,
      RouterLink,
      CommonModule,
      ReactiveFormsModule
    ],
})
export class HouseResidentsUpdateComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private residentService = inject(ResidentService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

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
