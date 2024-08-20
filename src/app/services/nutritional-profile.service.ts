import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponse } from '../models/list-response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NutritionalProfileDetail } from '../models/nutritional-profile-detail.model';

@Injectable({
  providedIn: 'root'
})
export class NutritionalProfileService {

  constructor(private http: HttpClient) { }

  // TODO: Corregir llamada a aang
  add(userId: number, params = {}) {
    return this.http.post(environment.aangBaseUrl + 'person/' + userId + '/nutritional-profile', params)
  }

  get(userId: number): Observable<ListResponse<NutritionalProfileDetail>> {
    return this.http.get<ListResponse<NutritionalProfileDetail>>(`${environment.backendUrl}user/${userId}/nutritional-profile`);
  }

  // TODO: Corregir llamada a aang
  update(userId: number, params = {}) {
    return this.http.put(environment.aangBaseUrl + 'person/' + userId + '/nutritional-profile', params);
  }


}
