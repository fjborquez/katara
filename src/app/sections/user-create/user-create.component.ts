import { Component } from '@angular/core';
import { CreateResponse } from 'src/app/models/create-response.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { dateToChileanFormat } from 'src/app/functions/dateToChileanFormat';

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
    this.personForm.addControl('nutritionalProfile', this.formBuilder.array([]));
  }

  onSubmit(): void {
    const params = {
      name: this.personForm.get('name')?.value,
      lastname: this.personForm.get('lastname')?.value,
      date_of_birth: dateToChileanFormat(this.personForm.get('date_of_birth')?.value || ''),
      email: this.personForm.get('email')?.value,
      password: this.personForm.get('password')?.value,
      nutritionalProfile: this.personForm.get('nutritionalProfile')?.value
    };

    console.log(params);

    this.userService.add<CreateResponse>(params).subscribe((response: CreateResponse) => {
      this.router.navigate(['/users']).then(() => {
        this.snackBar.open(response.message, "Close");
      });
    },
    (response: ErrorResponse) => {
      this.snackBar.open(response.error.message, "Close");
    });
  }
}
