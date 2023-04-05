import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private router:Router){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(sessionStorage.getItem('JWTToken')!=null){
        const token = sessionStorage.getItem('JWTToken');
        const headers = new HttpHeaders().set("Authorization", "Bearer "+ token);
        const AuthRequest = request.clone({headers:headers});
        return next.handle(AuthRequest).pipe(catchError((error:HttpErrorResponse)=>{
            console.log(error?.status);
            if(error?.status == 401){
                sessionStorage.removeItem('JWTToken');
                this.router.navigateByUrl('/');
            }
            return throwError(error);
        }))
    }
    else{
        return next.handle(request).pipe(catchError((error:HttpErrorResponse)=>{
            console.log(error?.status);
            this.router.navigateByUrl('/');
            return throwError(error);
        }));
    }
  }
}