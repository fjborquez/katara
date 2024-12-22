import { City } from '../models/city.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponse } from '../models/list-response.model';
import { Observable } from 'rxjs';
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
