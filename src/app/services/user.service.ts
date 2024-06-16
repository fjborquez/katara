import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  add(params = {}) {
    return this.http.post(environment.backendUrl + 'user', params)
  }

  list() {
    return this.http.get(environment.backendUrl + 'user')
  }

  get(id: number) {
    return this.http.get(environment.backendUrl + 'user/' + id)
  }

  update(id: number, params = {}) {
    return this.http.put(environment.backendUrl + 'user/' + id, params)
  }

  enable(userId: number) {
    return this.http.put(environment.backendUrl + 'user' + '/' + userId + '/enable', {});
  }

  disable(userId: number) {
    return this.http.put(environment.backendUrl + 'user' + '/' + userId + '/disable', {});
  }

}
