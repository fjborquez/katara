import { environment } from './../../environments/environment';
import { ListResponse } from './../models/list-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsumptionLevel } from '../models/consumption-level.model';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionLevelService {

  constructor(private http: HttpClient) { }

  list(): Observable<ListResponse<ConsumptionLevel>> {
    return this.http.get<ListResponse<ConsumptionLevel>>(environment.backendUrl + 'consumption-level')
  }
}
