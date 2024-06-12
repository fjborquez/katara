import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NutritionalRestriction } from '../models/nutritional-restriction.model';

@Injectable({
  providedIn: 'root'
})
export class NutritionalRestrictionService {

  constructor(private http: HttpClient) { }

  list(): Observable<NutritionalRestriction[]> {
    return this.http.get<NutritionalRestriction[]>(environment.backendUrl + 'nutritional-restriction')
  }
}
