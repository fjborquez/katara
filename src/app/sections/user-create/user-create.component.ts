import { PersonsService } from '../../services/persons.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NutritionalRestrictionService } from 'src/app/services/nutritional-restriction.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.sass']
})
export class UserCreateComponent {
  personForm = this.formBuilder.group({});
  nutritionalRestrictions: any;

  constructor(
    private formBuilder: FormBuilder,
    private personsService: PersonsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private nutritionalRestrictionService: NutritionalRestrictionService
  ) { }

  ngOnInit(): void {
    this.personForm.addControl('name', this.formBuilder.control(''));
    this.personForm.addControl('lastname', this.formBuilder.control(''));
    this.personForm.addControl('date_of_birth', this.formBuilder.control(''));
    this.personForm.addControl('email', this.formBuilder.control(''));
    this.personForm.addControl('password', this.formBuilder.control(''));

    this.nutritionalRestrictionService.list().subscribe(nutritionalRestrictions => {
      this.nutritionalRestrictions = nutritionalRestrictions;

      this.nutritionalRestrictions.forEach((nutritionalRestriction: any) => {
        this.personForm.addControl('nutritionalProfile[' + nutritionalRestriction.id + ']', this.formBuilder.control(false));
      });
    });
  }

  onSubmit(): void {
    const nutritionalProfile = Object.entries(this.personForm.value).filter((value) => {
      return value[1] === true;
    }).map((value) => {
      return Number(value[0].replace(/\D/g, ''));
    });

    const params = {
      name: this.personForm.get('name')?.value,
      lastname: this.personForm.get('lastname')?.value,
      date_of_birth: this.personForm.get('date_of_birth')?.value,
      email: this.personForm.get('email')?.value,
      password: this.personForm.get('password')?.value,
      nutritionalProfile: nutritionalProfile
    }

    this.personsService.add(params).subscribe((response: any) => {
      this.router.navigate(['/users']).then(() => {
        this.snackBar.open(response.message, "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });
  }
}
