import { Observable, of } from 'rxjs';

import { City } from '../models/city.model';
import { Injectable } from '@angular/core';
import { ListResponse } from '../models/list-response.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  list(): Observable<ListResponse<City>> {
    return of<ListResponse<City>>({
      message: [
        {id: 1, description: 'Santiago'},
        {id: 2, description: 'Viña del Mar'},
        {id: 3, description: 'Concepción'}
    ]})
  }
}
