import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ListResponse } from '../models/list-response.model';
import { NutritionalRestriction } from '../models/nutritional-restriction.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NutritionalRestrictionService {
  private http = inject(HttpClient);


  list(): Observable<ListResponse<NutritionalRestriction>> {
    return this.http.get<ListResponse<NutritionalRestriction>>(environment.backendUrl + 'nutritional-restriction')
  }
}
