import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { NutritionalRestrictionService } from 'src/app/services/nutritional-restriction.service';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-house-residents-update',
  templateUrl: './house-residents-update.component.html',
  styleUrls: ['./house-residents-update.component.sass']
})
export class HouseResidentsUpdateComponent {
  userId: number = 0;
  houseId: number = 0;
  residentId: number = 0;
  houseResidentForm = this.formBuilder.group({});
  nutritionalRestrictions: any = [];

  public constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private nutritionalRestrictionService: NutritionalRestrictionService,
    private residentService: ResidentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.houseId = this.activatedRoute.snapshot.params['idHouse'];
    this.residentId = this.activatedRoute.snapshot.params['idResident'];

    this.houseResidentForm.addControl('name', new FormControl(''));
    this.houseResidentForm.addControl('lastname', new FormControl(''));
    this.houseResidentForm.addControl('date_of_birth', new FormControl(''));

    this.nutritionalRestrictionService.list().pipe(
      tap((nutritionalRestrictions: any) => {
        this.nutritionalRestrictions = nutritionalRestrictions;

        this.nutritionalRestrictions.forEach((nutritionalRestriction: any) => {
          this.houseResidentForm.addControl('nutritionalProfile[' + nutritionalRestriction.id + ']', this.formBuilder.control(false));
        });
      }),
      tap(() => {
        this.residentService.get(this.userId, this.houseId, this.residentId).subscribe((resident: any) => {
          this.houseResidentForm.setControl('name', new FormControl(resident.name));
          this.houseResidentForm.setControl('lastname', new FormControl(resident.lastname));
          this.houseResidentForm.setControl('date_of_birth', new FormControl(resident.date_of_birth));

          const nutritionalProfile:any = [];
          for (const key in resident.nutritional_profile) {
            const newKey = "nutritionalProfile[" + resident.nutritional_profile[key].id + "]";
            nutritionalProfile[newKey] = true;
          }
          this.houseResidentForm.patchValue(nutritionalProfile);
        });
      }),
    ).subscribe();
  }

  onSubmit(): void {
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
