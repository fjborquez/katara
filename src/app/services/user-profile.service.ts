import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  add(userId: Number, params = {}) {
    return this.http.post(environment.aangBaseUrl + 'person/' + userId + '/nutritional-profile', params)
  }

  get(personId: Number) {
    return this.http.get(environment.aangBaseUrl + 'person/' + personId + '/nutritional-profile')
  }

  update(userId: Number, params = {}) {
    return this.http.put(environment.aangBaseUrl + 'person/' + userId + '/nutritional-profile', params);
  }


}
