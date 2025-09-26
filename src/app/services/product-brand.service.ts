import { ProductBrand } from '../models/product-brand.model';
import { environment } from '../../environments/environment';
import { ListResponse } from '../models/list-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductBrandService {
  private http = inject(HttpClient);


  list(): Observable<ListResponse<ProductBrand>> {
    return this.http.get<ListResponse<ProductBrand>>(environment.backendUrl + 'product-brand')
  }

  add<CreateResponse>(params = {}): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(environment.backendUrl + 'product-brand', params);
  }
}
