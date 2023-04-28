import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost:8080/auth/';
  constructor(private httpClient: HttpClient) {}
  performLogin(userDetails: any): Observable<any> {
    return this.httpClient.post(this.url, userDetails);
  }
}
