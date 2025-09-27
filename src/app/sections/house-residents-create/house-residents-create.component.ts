import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CreateResponse } from 'src/app/models/create-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NutritionalProfileComponent } from '../../components/nutritional-profile/nutritional-profile.component';
import { ResidentService } from 'src/app/services/resident.service';
import { dateToChileanFormat } from 'src/app/functions/dateToChileanFormat';

@Component({
    selector: 'app-house-residents-create',
    templateUrl: './house-residents-create.component.html',
    styleUrls: ['./house-residents-create.component.sass'],
    standalone: true,
    imports:[
      NutritionalProfileComponent,
      RouterLink,
      CommonModule,
      ReactiveFormsModule,
      MatButtonModule
    ]
})
export class HouseResidentsCreateComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private activatedRoute = inject(ActivatedRoute);
  private residentService = inject(ResidentService);

  userId = 0;
  houseId = 0;
  houseResidentForm = this.formBuilder.group({});
  nutritionalRestrictions: any = [];

  public ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.houseId = this.activatedRoute.snapshot.params['idHouse'];

    this.houseResidentForm.addControl('name', new FormControl(''));
    this.houseResidentForm.addControl('lastname', new FormControl(''));
    this.houseResidentForm.addControl('date_of_birth', new FormControl(new Date()));
    this.houseResidentForm.addControl('nutritionalProfile', new FormArray([]));
  }

  public onSubmit(): void {
    const date = dateToChileanFormat(this.houseResidentForm.get('date_of_birth')?.value || '');

    const params = {
      name: this.houseResidentForm.get('name')?.value,
      lastname: this.houseResidentForm.get('lastname')?.value,
      date_of_birth: date,
      nutritionalProfile: this.houseResidentForm.get('nutritionalProfile')?.value
    }

    this.residentService.add<CreateResponse>(this.userId, this.houseId, params).subscribe((response: CreateResponse) => {
      this.router.navigate(['/users/', this.userId, 'houses', this.houseId, 'residents']).then(() => {
        this.snackBar.open(response.message, "Close");
      });
    },
    (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });

  }
}
