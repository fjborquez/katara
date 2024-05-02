import { ActivatedRoute, Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonsService } from '../../services/persons.service';

@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.sass']
})
export class PersonUpdateComponent {
  personForm = this.formBuilder.group({
    name: '',
    lastname: '',
    date_of_birth: '',
    email: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private personsService: PersonsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let personId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.personsService.get(personId).subscribe((person) => {
      this.personForm.patchValue(person);
    });
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
