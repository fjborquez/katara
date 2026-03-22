import { LoginService } from './../../services/login.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);


  loginForm = this.formBuilder.group({});

  ngOnInit(): void {
    this.loginForm.addControl('email', this.formBuilder.control(''));
    this.loginForm.addControl('password', this.formBuilder.control(''));

    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/users']).then(() => {
        this.snackBar.open("Bienvenido", "Close");
      });
    }
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.loginService.login({
      email: email,
      password: password
    }).subscribe(() => {
      this.router.navigate(['/users']).then(() => {
        this.snackBar.open("Bienvenido", "Close");
      });
    });
  }

}
