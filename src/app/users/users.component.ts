import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent {
  userForm = this.formBuilder.group({
    email: '',
    password: '',
    person_id: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
) { }

  onSubmit(): void {
    const personId = this.route.snapshot.paramMap.get('id');
    this.userForm.patchValue({ person_id: personId });

    this.userService.add(this.userForm.value).subscribe(() => {
      this.router.navigate(['/persons']).then(() => {
        this.snackBar.open("User added", "Close");
      });
    },
    (error) => {
      this.snackBar.open(error.error.message, "Close");
    });
  }
}
