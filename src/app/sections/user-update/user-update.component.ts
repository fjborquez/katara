import { dateToChileanFormat } from 'src/app/functions/dateToChileanFormat';
import { ActivatedRoute, Router } from '@angular/router';

import { Component } from '@angular/core';
import { EditResponse } from 'src/app/models/edit-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { FormBuilder } from '@angular/forms';
import { GetResponse } from 'src/app/models/get-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from 'src/app/models/person.model';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { nutritionalProfileToArray } from 'src/app/functions/nutritionalProfileToArray';
import { NutritionalProfileDetail } from 'src/app/models/nutritional-profile-detail.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.sass']
})
export class UserUpdateComponent {
  userForm = this.formBuilder.group({});
  nutritionalRestrictions: any;
  userId = 0;
  nutritionalProfile: NutritionalProfileDetail[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userForm.addControl('name', this.formBuilder.control(''));
    this.userForm.addControl('lastname', this.formBuilder.control(''));
    this.userForm.addControl('date_of_birth', this.formBuilder.control(''));
    this.userForm.addControl('email', this.formBuilder.control(''));
    this.userForm.addControl('password', this.formBuilder.control(''));
    this.userForm.addControl('nutritionalProfile', this.formBuilder.array([]));

    this.userService.get(this.userId).subscribe((response: GetResponse<User & Person>) => {
      const user = response.message;
      const person = user.person;

      const userData = {
        name: person.name,
        lastname: person.lastname,
        date_of_birth: person.date_of_birth,
        email: user.email,
        password: user.password,
      };

      this.nutritionalProfile = person.nutritional_profile || [];
      this.userForm.patchValue(userData);
    });
  }

  onSubmit(): void {
    const nutritionalProfile = this.userForm.get('nutritionalProfile')?.value;
    const params = {
      name: this.userForm.get('name')?.value,
      lastname: this.userForm.get('lastname')?.value,
      date_of_birth: dateToChileanFormat(this.userForm.get('date_of_birth')?.value || ''),
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      nutritionalProfile: nutritionalProfile
    }

    this.userService.update<EditResponse>(this.userId, params).subscribe((response: EditResponse) => {
      this.router.navigate(['/users']).then(() => {
        this.snackBar.open(response.message, "Close");
      });
    },
    (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });
  }
}
