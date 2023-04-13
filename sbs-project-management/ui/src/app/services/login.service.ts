import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = environment.base_url + '/auth';
  constructor(private httpClient: HttpClient) {}
  performLogin(userDetails: any): Observable<any> {
    return this.httpClient.post(this.url, userDetails);
  }
}
