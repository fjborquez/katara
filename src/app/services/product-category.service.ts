import { ProductCategory } from './../models/product-category.model';
import { environment } from './../../environments/environment';
import { ListResponse } from './../models/list-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient) { }

  list(): Observable<ListResponse<ProductCategory>> {
    return this.http.get<ListResponse<ProductCategory>>(environment.backendUrl + 'product-category')
  }

  add<CreateResponse>(params = {}): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(environment.backendUrl + 'product-category', params);
  }
}
