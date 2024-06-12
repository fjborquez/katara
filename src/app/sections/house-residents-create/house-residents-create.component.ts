import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { dateToChileanFormat } from 'src/app/functions/dateToChileanFormat';
import { nutritionalProfileToArray } from 'src/app/functions/nutritionalProfileToArray';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-house-residents-create',
  templateUrl: './house-residents-create.component.html',
  styleUrls: ['./house-residents-create.component.sass']
})
export class HouseResidentsCreateComponent {
  userId: number = 0;
  houseId: number = 0;
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
  }

  public onSubmit(): void {
    const nutritionalProfile = nutritionalProfileToArray(this.houseResidentForm.value);
    const date = dateToChileanFormat(this.houseResidentForm.get('date_of_birth')?.value || '');

    const params = {
      name: this.houseResidentForm.get('name')?.value,
      lastname: this.houseResidentForm.get('lastname')?.value,
      date_of_birth: date,
      nutritional_profile: nutritionalProfile
    }

    this.residentService.add(this.userId, this.houseId, params).subscribe((response: any) => {
      this.router.navigate(['/users/', this.userId, 'houses', this.houseId, 'residents']).then(() => {
        this.snackBar.open(response.message, "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });

  }
}
