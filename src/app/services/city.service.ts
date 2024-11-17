import { Observable, of } from 'rxjs';

import { City } from '../models/city.model';
import { Injectable } from '@angular/core';
import { ListResponse } from '../models/list-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  list(): Observable<ListResponse<City>> {
    return this.http.get<ListResponse<City>>(environment.backendUrl + 'city')
  }
}
