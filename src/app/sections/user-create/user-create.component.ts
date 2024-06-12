import { UserService } from '../../services/user.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { nutritionalProfileToArray } from 'src/app/functions/nutritionalProfileToArray';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.sass']
})
export class UserCreateComponent {
  personForm = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.personForm.addControl('name', this.formBuilder.control(''));
    this.personForm.addControl('lastname', this.formBuilder.control(''));
    this.personForm.addControl('date_of_birth', this.formBuilder.control(''));
    this.personForm.addControl('email', this.formBuilder.control(''));
    this.personForm.addControl('password', this.formBuilder.control(''));
  }

  onSubmit(): void {
    const nutritionalProfile = nutritionalProfileToArray(this.personForm.value);
    const params = {
      name: this.personForm.get('name')?.value,
      lastname: this.personForm.get('lastname')?.value,
      date_of_birth: this.personForm.get('date_of_birth')?.value,
      email: this.personForm.get('email')?.value,
      password: this.personForm.get('password')?.value,
      nutritionalProfile: nutritionalProfile
    }

    this.userService.add(params).subscribe((response: any) => {
      this.router.navigate(['/users']).then(() => {
        this.snackBar.open(response.message, "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });
  }
}
