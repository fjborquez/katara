import { ProductCatalog } from './../models/product-catalog.model';
import { environment } from '../../environments/environment';
import { ListResponse } from '../models/list-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateResponse } from '../models/create-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {
  private http = inject(HttpClient);


  list(): Observable<ListResponse<ProductCatalog>> {
    return this.http.get<ListResponse<ProductCatalog>>(environment.backendUrl + 'product-catalog')
  }

  add(params = {}) {
    return this.http.post(environment.backendUrl + 'product-catalog', params, { observe: 'response' }).pipe(
      map((response) => {
        const data = response.body as CreateResponse;
        const headers = response.headers;
        return { data, headers };
      })
    );
  }
}
