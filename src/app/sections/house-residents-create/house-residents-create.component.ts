import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

import { CreateResponse } from 'src/app/models/create-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResidentService } from 'src/app/services/resident.service';
import { dateToChileanFormat } from 'src/app/functions/dateToChileanFormat';

@Component({
  selector: 'app-house-residents-create',
  templateUrl: './house-residents-create.component.html',
  styleUrls: ['./house-residents-create.component.sass']
})
export class HouseResidentsCreateComponent implements OnInit {
  userId = 0;
  houseId = 0;
  houseResidentForm = this.formBuilder.group({});
  nutritionalRestrictions: any = [];

  public constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private residentService: ResidentService
  ) {}

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
