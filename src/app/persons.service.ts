import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor(private http: HttpClient) { }

  add(params = {}) {
    return this.http.post(environment.aangBaseUrl + 'person', params)
  }

  list() {
    return this.http.get(environment.aangBaseUrl + 'person')
  }

}
