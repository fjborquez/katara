import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Inventory } from '../models/inventory.model';
import { ListResponse } from './../models/list-response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryHousesService {
  private http = inject(HttpClient);


  getHousesByUser(userId: number, houseId: number): Observable<ListResponse<Inventory>> {
    return this.http.get<ListResponse<Inventory>>(`${environment.backendUrl}user/${userId}/houses/${houseId}/inventory`);
  }

  add<CreateResponse>(userId: number, houseId: number, params = {}): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(`${environment.backendUrl}user/${userId}/houses/${houseId}/inventory`, params);
  }

  discard<EditResponse>(userId: number, houseId: number, inventoryId: number): Observable<EditResponse> {
    return this.http.put<EditResponse>(`${environment.backendUrl}user/${userId}/houses/${houseId}/inventory/${inventoryId}/discard`, {});
  }

  consume<EditResponse>(userId: number, houseId: number, inventoryId: number): Observable<EditResponse> {
    return this.http.put<EditResponse>(`${environment.backendUrl}user/${userId}/houses/${houseId}/inventory/${inventoryId}/consume`, {});
  }

  update<EditResponse>(userId: number, houseId: number, invevntoryId: number, params = {}): Observable<EditResponse> {
    return this.http.put<EditResponse>(`${environment.backendUrl}user/${userId}/houses/${houseId}/inventory/${invevntoryId}`, params);
  }

  get(userId: number, houseId: number, inventoryId: number) {
    return this.http.get(`${environment.backendUrl}user/${userId}/houses/${houseId}/inventory/${inventoryId}`);
  }
}
