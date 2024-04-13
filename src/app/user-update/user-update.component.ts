import { ActivatedRoute, Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';
import { PersonsService } from '../persons.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.sass']
})
export class UserUpdateComponent {
  user: any = null;
  userForm = this.formBuilder.group({
    email: '',
    password: '',
    person_id: ''
  });
  persons: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private personsService: PersonsService
  ) {}

  ngOnInit() {
    let userId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.get(userId).subscribe(user => {
      this.user = user;
      console.log(user);
      this.userForm.patchValue(user);
    });
    this.personsService.list().subscribe(persons => this.persons = persons);
  }

  onSubmit(): void {
    this.userService.update(this.user.id, this.userForm.value).subscribe(() => {
      this.router.navigate(['/users']).then(() => {
        this.snackBar.open("User updated", "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });
  }
}
