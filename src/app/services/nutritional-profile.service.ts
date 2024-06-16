import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NutritionalRestriction } from '../models/nutritional-restriction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionalProfileService {

  constructor(private http: HttpClient) { }

  // TODO: Corregir llamada a aang
  add(userId: number, params = {}) {
    return this.http.post(environment.aangBaseUrl + 'person/' + userId + '/nutritional-profile', params)
  }

  get(userId: number): Observable<NutritionalRestriction[]> {
    return this.http.get<NutritionalRestriction[]>(`${environment.backendUrl}user/${userId}/nutritional-profile`);
  }

  // TODO: Corregir llamada a aang
  update(userId: number, params = {}) {
    return this.http.put(environment.aangBaseUrl + 'person/' + userId + '/nutritional-profile', params);
  }


}
