import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from '../services/login.service';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
// import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [LoginService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
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
});
