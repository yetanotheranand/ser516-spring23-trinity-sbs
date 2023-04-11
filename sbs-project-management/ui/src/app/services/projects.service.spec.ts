import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('ProjectsService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
