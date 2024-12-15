import { ProductBrand } from '../models/product-brand.model';
import { environment } from '../../environments/environment';
import { ListResponse } from '../models/list-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductBrandService {

  constructor(private http: HttpClient) { }

  list(): Observable<ListResponse<ProductBrand>> {
    return this.http.get<ListResponse<ProductBrand>>(environment.backendUrl + 'product-brand')
  }
}
