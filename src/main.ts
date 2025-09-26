import { AppComponent } from './app/app.component';
import { Component } from '@angular/core';
import { ROUTES } from './app/app-routing.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ''
})
export class MainComponent {

}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    provideHttpClient()
  ]
});
