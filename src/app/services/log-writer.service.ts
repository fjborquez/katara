import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogWriterService {
  private http = inject(HttpClient);


  add(params = {}) {
    return this.http.post(environment.backendUrl + 'log-writer', params);
  }
}
