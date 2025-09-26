import { Observable } from 'rxjs';

import { Injectable, inject } from '@angular/core';
import { ListResponse } from '../models/list-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UnitOfMeasurement } from '../models/unit-of-measurement.model';

@Injectable({
  providedIn: 'root'
})
export class UnitOfMeasurementService {
  private http = inject(HttpClient);


  list(params = {}): Observable<ListResponse<UnitOfMeasurement>> {
    return this.http.get<ListResponse<UnitOfMeasurement>>(environment.backendUrl + 'unit-of-measurement', {params: params})
  }
}
