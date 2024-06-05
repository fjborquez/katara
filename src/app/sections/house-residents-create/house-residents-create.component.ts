import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NutritionalRestrictionService } from 'src/app/services/nutritional-restriction.service';
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
    private nutritionalRestrictionService: NutritionalRestrictionService,
    private residentService: ResidentService
  ) {}

  public ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.houseId = this.activatedRoute.snapshot.params['idHouse'];

    this.houseResidentForm.addControl('name', new FormControl(''));
    this.houseResidentForm.addControl('lastname', new FormControl(''));
    this.houseResidentForm.addControl('date_of_birth', new FormControl(new Date()));

    this.nutritionalRestrictionService.list().subscribe((nutritionalRestrictions: any) => {
      this.nutritionalRestrictions = nutritionalRestrictions;

      this.nutritionalRestrictions.forEach((nutritionalRestriction: any) => {
        this.houseResidentForm.addControl('nutritionalProfile[' + nutritionalRestriction.id + ']', this.formBuilder.control(false));
      });
    });
  }

  public onSubmit(): void {
    const nutritionalProfile = Object.entries(this.houseResidentForm.value).filter((value) => {
      return value[1] === true;
    }).map((value) => {
      return Number(value[0].replace(/\D/g, ''));
    });

    const date = (this.houseResidentForm.get('date_of_birth')?.value || '').split('-').reverse().join('/');

    const params = {
      name: this.houseResidentForm.get('name')?.value,
      lastname: this.houseResidentForm.get('lastname')?.value,
      date_of_birth: date,
      nutritional_profile: nutritionalProfile
    }

    this.residentService.add(this.userId, this.houseId, params).subscribe((response: any) => {
      this.router.navigate(['/users/', this.userId, '/houses/' + this.houseId]).then(() => {
        this.snackBar.open(response.message, "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });

  }
}
