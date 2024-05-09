import { ActivatedRoute, Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { NutritionalRestrictionService } from 'src/app/services/nutritional-restriction.service';
import { tap } from 'rxjs';
import { NutritionalProfileService } from 'src/app/services/nutritional-profile.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.sass']
})
export class UserUpdateComponent {
  userForm = this.formBuilder.group({});
  nutritionalRestrictions: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private nutritionalRestrictionService: NutritionalRestrictionService,
    private nutritionalProfileService: NutritionalProfileService
  ) { }

  ngOnInit(): void {
    let userId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.userForm.addControl('name', this.formBuilder.control(''));
    this.userForm.addControl('lastname', this.formBuilder.control(''));
    this.userForm.addControl('date_of_birth', this.formBuilder.control(''));
    this.userForm.addControl('email', this.formBuilder.control(''));
    this.userForm.addControl('password', this.formBuilder.control(''));

    this.userService.get(userId).subscribe((user: any) => {
      const userData = {
        name: user.person.name,
        lastname: user.person.lastname,
        date_of_birth: user.person.date_of_birth,
        email: user.email,
        password: user.password
      };

      this.userForm.patchValue(userData);
    });

    this.nutritionalRestrictionService.list().pipe(
      tap((nutritionalRestrictions:any) => {
        this.nutritionalRestrictions = nutritionalRestrictions;

        this.nutritionalRestrictions.forEach((nutritionalRestriction: any) => {
          this.userForm.addControl('nutritionalProfile[' + nutritionalRestriction.id + ']', this.formBuilder.control(false));
        });
      }),
      tap(() => {
        this.nutritionalProfileService.get(userId).subscribe((userProfile: any) => {
          const nutritionalProfile:any = [];
          for (const key in userProfile) {
            const newKey = "nutritionalProfile[" + userProfile[key].id + "]";
            nutritionalProfile[newKey] = true;
          }
          this.userForm.patchValue(nutritionalProfile);
        })
      }
    )).subscribe();
  }

  onSubmit(): void {
    let personId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.update(personId, this.userForm.value).subscribe(() => {
      this.router.navigate(['/users']).then(() => {
        this.snackBar.open("Person updated", "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });
  }
}
