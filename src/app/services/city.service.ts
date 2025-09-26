import { City } from '../models/city.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ListResponse } from '../models/list-response.model';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private http = inject(HttpClient);


  list(): Observable<ListResponse<City>> {
    return this.http.get<ListResponse<City>>(environment.backendUrl + 'city')
  }
}
