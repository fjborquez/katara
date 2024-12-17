import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ListResponse } from '../models/list-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UnitOfMeasurement } from '../models/unit-of-measurement.model';

@Injectable({
  providedIn: 'root'
})
export class UnitOfMeasurementService {

  constructor(private http: HttpClient) { }

  list(params = {}): Observable<ListResponse<UnitOfMeasurement>> {
    return this.http.get<ListResponse<UnitOfMeasurement>>(environment.backendUrl + 'unit-of-measurement', {params: params})
  }
}
