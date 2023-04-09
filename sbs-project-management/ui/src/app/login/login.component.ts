import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  errorMessage: string | undefined;
  constructor(private loginService: LoginService, private router: Router) {
    console.log(this.loginForm.get('username').value);
  }
  continueToLogin() {
    const userDetails = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
    };
    console.log(userDetails.username);
    this.loginService.performLogin(userDetails).subscribe(
      (data) => {
        console.log(data);
        sessionStorage.setItem('JWTToken', data?.auth_token);
        sessionStorage.setItem('refreshToken', data?.refresh);
        sessionStorage.setItem('UserId', data?.id);
        
        this.router.navigateByUrl('/projects');
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = error.error.detail;
          console.log(this.errorMessage);
        }
      }
    );
  }
}
