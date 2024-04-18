import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonHouseService {

  constructor(private http: HttpClient) { }

  add(idPerson: Number, params = {}) {
    return this.http.post(environment.aangBaseUrl + 'person/' + idPerson + "/house", params)
  }
}
