import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  add(userId: Number, params = {}) {
    return this.http.post(environment.aangBaseUrl + 'user/' + userId + '/nutritional-profile', params)
  }
}
