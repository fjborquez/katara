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

  list(userId: number, houseId: number) {
    return this.http.get(environment.backendUrl + 'user/' + userId + '/houses/' + houseId + '/residents')
  }

  get(userId: number, houseId: number, residentId: number) {
    return this.http.get(environment.backendUrl + 'user/' + userId + '/houses/' + houseId + '/residents/' + residentId)
  }

  update(userId: number, houseId: number, residentId: number, params = {}) {
    return this.http.put(environment.backendUrl + 'user/' + userId + '/houses/' + houseId + '/residents/' + residentId, params);
  }
}
