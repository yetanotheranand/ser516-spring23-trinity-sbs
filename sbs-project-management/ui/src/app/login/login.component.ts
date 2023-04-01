import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm=new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private loginService:LoginService, private router: Router){

  }
  continueToLogin(){
    let userDetails={
      username: this.loginForm.get("email")?.value,
      password: this.loginForm.get("password")?.value,
      type:"normal"
    };
    this.loginService.performLogin(userDetails).subscribe((data)=>{
      console.log(data);
      sessionStorage.setItem("JWTToken",data?.auth_token);
      this.router.navigateByUrl("/projects")
    },
    (error)=>{
      console.log(error)
    }
    )

  }
}
