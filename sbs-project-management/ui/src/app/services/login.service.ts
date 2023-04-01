import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url :string="https://api.taiga.io/api/v1/auth"
  constructor(private httpClient: HttpClient) {

   }
   performLogin(userDetails:any):Observable<any>{
    return this.httpClient.post(this.url,userDetails);
   }
}
