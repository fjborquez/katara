import { ProductPresentation } from '../models/product-presentation.model';
import { environment } from '../../environments/environment';
import { ListResponse } from '../models/list-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductPresentationService {

  constructor(private http: HttpClient) { }

  list(): Observable<ListResponse<ProductPresentation>> {
    return this.http.get<ListResponse<ProductPresentation>>(environment.backendUrl + 'product-presentation')
  }

  add<CreateResponse>(params = {}): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(environment.backendUrl + 'product-presentation', params);
  }
}
