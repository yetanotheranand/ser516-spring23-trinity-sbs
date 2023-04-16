import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GetApiService {
  constructor(private http: HttpClient) {}
  apicall() {
    return this.http.get('http://localhost:8080/scrumboard/v1/data');
  }
}
