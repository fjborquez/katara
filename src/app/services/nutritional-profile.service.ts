import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NutritionalProfileService {

  constructor(private http: HttpClient) { }

  add(userId: Number, params = {}) {
    return this.http.post(environment.aangBaseUrl + 'person/' + userId + '/nutritional-profile', params)
  }

  get(userId: Number) {
    return this.http.get(environment.backendUrl + 'user/' + userId + '/nutritional-profile')
  }

  update(userId: Number, params = {}) {
    return this.http.put(environment.aangBaseUrl + 'person/' + userId + '/nutritional-profile', params);
  }


}
