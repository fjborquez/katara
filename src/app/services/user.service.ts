import { GetResponse } from '../models/get-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponse } from '../models/list-response.model';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  add<CreateResponse>(params = {}): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(environment.backendUrl + 'user', params);
  }

  list(): Observable<ListResponse<User>> {
    return this.http.get<ListResponse<User>>(environment.backendUrl + 'user');
  }

  get(id: number): Observable<GetResponse<User & Person>> {
    return this.http.get<GetResponse<User & Person>>(environment.backendUrl + 'user/' + id)
  }

  update<EditResponse>(id: number, params = {}): Observable<EditResponse> {
    return this.http.put<EditResponse>(environment.backendUrl + 'user/' + id, params)
  }

  enable<EditResponse>(userId: number): Observable<EditResponse> {
    return this.http.put<EditResponse>(environment.backendUrl + 'user' + '/' + userId + '/enable', {});
  }

  disable<EditResponse>(userId: number): Observable<EditResponse> {
    return this.http.put<EditResponse>(environment.backendUrl + 'user' + '/' + userId + '/disable', {});
  }

}
