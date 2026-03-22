import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  standalone: true,
  imports: [MatToolbar, MatToolbarRow, RouterOutlet, RouterLink, MatButton],
})
export class AppComponent {
  title = 'katara';
  loginService: LoginService = inject(LoginService);

}
