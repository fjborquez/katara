import { ProductCatalog } from './../models/product-catalog.model';
import { environment } from '../../environments/environment';
import { ListResponse } from '../models/list-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {
  private http = inject(HttpClient);


  list(): Observable<ListResponse<ProductCatalog>> {
    return this.http.get<ListResponse<ProductCatalog>>(environment.backendUrl + 'product-catalog')
  }

  add<CreateResponse>(params = {}): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(environment.backendUrl + 'product-catalog', params);
  }
}
