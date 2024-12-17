import { ListResponse } from './../models/list-response.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryHousesService {

  constructor(private http: HttpClient) { }

  getHousesByUser(userId: number, houseId: number): Observable<ListResponse<Inventory>> {
    return this.http.get<ListResponse<Inventory>>(`${environment.backendUrl}user/${userId}/houses/${houseId}/inventory`);
  }

  add<CreateResponse>(userId: number, houseId: number, params = {}): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(`${environment.backendUrl}user/${userId}/houses/${houseId}/inventory`, params);
  }
}
