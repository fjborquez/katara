import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private http = inject(HttpClient);


  add(params = {}) {
    return this.http.post(environment.aangBaseUrl + 'house', params)
  }

  list() {
    return this.http.get(environment.aangBaseUrl + 'house')
  }

  update(id: number, params = {}) {
    return this.http.put(environment.aangBaseUrl + 'house/' + id, params)
  }

  get(id: number) {
    return this.http.get(environment.aangBaseUrl + 'house/' + id)
  }
}
