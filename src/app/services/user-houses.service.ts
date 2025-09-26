import { CreateResponse } from '../models/create-response.model';
import { EditResponse } from '../models/edit-response.model';
import { House } from '../models/house.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ListResponse } from '../models/list-response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserHousesService {
  private http = inject(HttpClient);


  add(idUser: number, params = {}): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(`${environment.backendUrl}user/${idUser}/houses`, params);
  }

  getHousesByUser(idUser: number): Observable<ListResponse<House>> {
    return this.http.get<ListResponse<House>>(`${environment.backendUrl}user/${idUser}/houses`);
  }

  updateHousesByUser<EditResponse>(idUser: number, params = {}): Observable<EditResponse> {
    return this.http.put<EditResponse>(`${environment.backendUrl}user/${idUser}/houses`, params);
  }

  enable(idUser: number, idHouse: number) {
    return this.http.put<EditResponse>(`${environment.backendUrl}user/${idUser}/houses/${idHouse}/enable`, {});
  }

  disable(idUser: number, idHouse: number): Observable<EditResponse> {
    return this.http.put<EditResponse>(`${environment.backendUrl}user/${idUser}/houses/${idHouse}/disable`, {});
  }
}
