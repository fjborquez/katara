import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogWriterService {

  constructor(private http: HttpClient) { }

  add(params = {}) {
    return this.http.post(environment.backendUrl + 'log-writer', params);
  }
}
