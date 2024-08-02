import { GetResponse } from '../models/get-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponse } from '../models/list-response.model';
import { Observable } from 'rxjs';
import { Resident } from '../models/resident.model';
import { environment } from 'src/environments/environment';
import { EditResponse } from '../models/edit-response.model';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  constructor(private http: HttpClient) { }

  add<CreateResponse>(userId: number, houseId: number, params = {}): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(`${environment.backendUrl}user/${userId}/houses/${houseId}/residents`, params)
  }

  list(userId: number, houseId: number): Observable<ListResponse<Resident>> {
    return this.http.get<ListResponse<Resident>>(`${environment.backendUrl}user/${userId}/houses/${houseId}/residents`)
  }

  get(userId: number, houseId: number, residentId: number): Observable<GetResponse<Resident>> {
    return this.http.get<GetResponse<Resident>>(`${environment.backendUrl}user/${userId}/houses/${houseId}/residents/${residentId}`);
  }

  update<EditResponse>(userId: number, houseId: number, residentId: number, params = {}): Observable<EditResponse> {
    return this.http.put<EditResponse>(`${environment.backendUrl}user/${userId}/houses/${houseId}/residents/${residentId}`, params);
  }

  delete(userId: number, houseId: number, residentId: number): Observable<EditResponse> {
    return this.http.delete<EditResponse>(`${environment.backendUrl}user/${userId}/houses/${houseId}/residents/${residentId}`);
  }
}
