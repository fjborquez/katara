import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserHousesService {

  constructor(private http: HttpClient) { }

  add(idUser: number, params = {}) {
    return this.http.post(environment.backendUrl + 'user/' + idUser + "/houses", params)
  }

  getHousesByUser(idUser: number) {
    return this.http.get(environment.backendUrl + 'user/' + idUser + "/houses");
  }

  updateHousesByUser(idUser: number, params = {}) {
    return this.http.put(environment.backendUrl + 'user/' + idUser + "/houses", params);
  }

  enable(idUser: number, idHouse: number) {
    return this.http.put(environment.backendUrl + 'user/' + idUser + "/houses/" + idHouse + "/enable", {});
  }

  disable(idUser: number, idHouse: number) {
    return this.http.put(environment.backendUrl + 'user/' + idUser + "/houses/" + idHouse + "/disable", {});
  }
}
