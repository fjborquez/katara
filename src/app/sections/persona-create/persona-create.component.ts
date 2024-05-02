import { PersonsService } from '../../services/persons.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-persona-create',
  templateUrl: './persona-create.component.html',
  styleUrls: ['./persona-create.component.sass']
})
export class PersonaCreateComponent {
  personForm = this.formBuilder.group({
    name: '',
    lastname: '',
    date_of_birth: '',
    email: '',
    password: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private personsService: PersonsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onSubmit(): void {
    this.personsService.add(this.personForm.value).subscribe((response: any) => {
      this.router.navigate(['/persons']).then(() => {
        this.snackBar.open(response.message, "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });
  }
}
