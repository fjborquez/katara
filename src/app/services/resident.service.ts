import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  constructor(private http: HttpClient) { }

  add(userId: number, houseId: number, params = {}) {
    return this.http.post(environment.backendUrl + 'user/' + userId + '/houses/' + houseId + '/residents', params)
  }
}
