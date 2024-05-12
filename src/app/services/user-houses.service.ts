import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserHousesService {

  constructor(private http: HttpClient) { }

  add(idPerson: Number, params = {}) {
    return this.http.post(environment.aangBaseUrl + 'person/' + idPerson + "/house", params)
  }

  getHousesByUser(idUser: Number) {
    return this.http.get(environment.backendUrl + 'user/' + idUser + "/houses");
  }

  updateHousesByPerson(idPerson: Number, params = {}) {
    return this.http.put(environment.aangBaseUrl + 'person/' + idPerson + "/house", params);
  }
}
