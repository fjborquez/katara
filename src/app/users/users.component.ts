import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent {
  userForm = this.formBuilder.group({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {}

  onSubmit(): void {
    this.userService.add(this.userForm.value).subscribe(() => {
      alert('User added');
    },
    (error) => {
      alert(error.error.message);
    });
  }
}
