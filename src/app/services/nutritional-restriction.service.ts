import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NutritionalRestrictionService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(environment.backendUrl + 'nutritional-restriction')
  }

}
