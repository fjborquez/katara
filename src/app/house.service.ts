import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private http: HttpClient) { }

  add(params = {}) {
    return this.http.post(environment.aangBaseUrl + 'house', params)
  }

  list() {
    return this.http.get(environment.aangBaseUrl + 'house')
  }

  update(id: Number, params = {}) {
    return this.http.put(environment.aangBaseUrl + 'house/' + id, params)
  }

  get(id: Number) {
    return this.http.get(environment.aangBaseUrl + 'house/' + id)
  }
}
