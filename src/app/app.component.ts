import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router'

import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    standalone: true,
    imports: [
      MatToolbar,
      MatToolbarRow,
      RouterOutlet,
      RouterLink,
    ],
})
export class AppComponent {
  title = 'katara';
}
