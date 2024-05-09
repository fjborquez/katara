import { ActivatedRoute, Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonsService } from '../../services/persons.service';
import { NutritionalRestrictionService } from 'src/app/services/nutritional-restriction.service';
import { tap } from 'rxjs';
import { NutritionalProfileService } from 'src/app/services/nutritional-profile.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.sass']
})
export class UserUpdateComponent {
  personForm = this.formBuilder.group({});
  nutritionalRestrictions: any;

  constructor(
    private formBuilder: FormBuilder,
    private personsService: PersonsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private nutritionalRestrictionService: NutritionalRestrictionService,
    private nutritionalProfileService: NutritionalProfileService
  ) { }

  ngOnInit(): void {
    let userId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.personForm.addControl('name', this.formBuilder.control(''));
    this.personForm.addControl('lastname', this.formBuilder.control(''));
    this.personForm.addControl('date_of_birth', this.formBuilder.control(''));
    this.personForm.addControl('email', this.formBuilder.control(''));
    this.personForm.addControl('password', this.formBuilder.control(''));

    this.personsService.get(userId).subscribe((person) => {
      this.personForm.patchValue(person);
    });

    this.nutritionalRestrictionService.list().pipe(
      tap((nutritionalRestrictions:any) => {
        this.nutritionalRestrictions = nutritionalRestrictions;

        this.nutritionalRestrictions.forEach((nutritionalRestriction: any) => {
          this.personForm.addControl('nutritionalProfile[' + nutritionalRestriction.id + ']', this.formBuilder.control(false));
        });
      }),
      tap(() => {
        this.nutritionalProfileService.get(userId).subscribe((userProfile: any) => {
          const nutritionalProfile:any = [];
          for (const key in userProfile) {
            const newKey = "nutritionalProfile[" + userProfile[key].id + "]";
            nutritionalProfile[newKey] = true;
          }
          this.personForm.patchValue(nutritionalProfile);
        })
      }
    )).subscribe();
  }

  onSubmit(): void {
    let personId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.personsService.update(personId, this.personForm.value).subscribe(() => {
      this.router.navigate(['/persons']).then(() => {
        this.snackBar.open("Person updated", "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });
  }
}
