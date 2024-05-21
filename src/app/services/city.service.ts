import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor() { }

  list() {
    return of([
      {id: 1, description: 'Santiago'}, {id: 2, description: 'Viña del Mar'}, {id: 3, description: 'Concepción'}
    ])
  }
}
