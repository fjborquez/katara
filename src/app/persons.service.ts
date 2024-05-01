import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor(private http: HttpClient) { }

  add(params = {}) {
    return this.http.post(environment.backendUrl + 'user-registration', params)
  }

  list() {
    return this.http.get(environment.backendUrl + 'user-list')
  }

  get(id: Number) {
    return this.http.get(environment.aangBaseUrl + 'person/' + id)
  }

  update(id: Number, params = {}) {
    return this.http.put(environment.backendUrl + 'user-update/' + id, params)
  }

}
