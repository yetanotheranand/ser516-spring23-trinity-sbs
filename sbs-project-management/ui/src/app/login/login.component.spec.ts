import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from '../services/login.service';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
// import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let router: Router;
  let routerSpy: jasmine.SpyObj<Router>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let loginService: LoginService;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['performLogin']);
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: LoginService, useValue: loginServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    loginService = TestBed.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with username and password fields', () => {
    expect(component.loginForm.contains('username')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should mark username field as invalid if it is empty', () => {
    const username = component.loginForm.controls['username'];
    expect(username.valid).toBeFalsy();

    username.setValue('');
    expect(username.hasError('required')).toBeTruthy();
  });

  it('should mark password field as invalid if it is empty', () => {
    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  it('should mark both fields as invalid if they are empty', () => {
    const username = component.loginForm.controls['username'];
    const password = component.loginForm.controls['password'];

    expect(component.loginForm.valid).toBeFalsy();

    username.setValue('');
    password.setValue('');
    expect(component.loginForm.valid).toBeFalsy();

    expect(username.hasError('required')).toBeTruthy();
    expect(password.hasError('required')).toBeTruthy();
  });

  it('should mark both fields as valid if they are filled in', () => {
    const username = component.loginForm.controls['username'];
    const password = component.loginForm.controls['password'];

    expect(component.loginForm.valid).toBeFalsy();

    username.setValue('testuser');
    password.setValue('testpass');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should display error message if login fails', () => {
    component.errorMessage = 'Invalid username or password';
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.text-danger');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Invalid username or password');
  });

  it('should set errorMessage when server returns 401 error', () => {
    const loginServiceSpy = TestBed.inject(
      LoginService
    ) as jasmine.SpyObj<LoginService>;
    loginServiceSpy.performLogin.and.returnValue(
      throwError({ status: 401, error: { detail: 'Unauthorized' } })
    );

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Unauthorized');
  });

  it('should navigate to projects page when login is successful', () => {
    const successResponse = {
      auth_token: 'abcdefg',
      refresh: '123456',
      id: 1,
    };
    loginServiceSpy.performLogin.and.returnValue(of(successResponse));

    component.continueToLogin();

    expect(sessionStorage.getItem('JWTToken')).toBe('abcdefg');
    expect(sessionStorage.getItem('refreshToken')).toBe('123456');
    expect(sessionStorage.getItem('UserId')).toBe('1');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/projects');
  });
});
