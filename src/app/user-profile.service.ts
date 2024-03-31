import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  add(userId: number, params = {}) {
    return this.http.post(environment.aangBaseUrl + 'user/' + userId + '/user-profile', params)
  }
}
