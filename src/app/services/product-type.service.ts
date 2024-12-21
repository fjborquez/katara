import { ProductType } from '../models/product-type.model';
import { environment } from '../../environments/environment';
import { ListResponse } from '../models/list-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private http: HttpClient) { }

  list(): Observable<ListResponse<ProductType>> {
    return this.http.get<ListResponse<ProductType>>(environment.backendUrl + 'product-type')
  }

  add<CreateResponse>(params = {}): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(environment.backendUrl + 'product-type', params);
  }
}
