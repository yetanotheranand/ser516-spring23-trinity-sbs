import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProjectsService } from './projects.service';
import { environment } from 'src/environment/environment';

fdescribe('ProjectsService', () => {
  let service: ProjectsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectsService],
    });
    service = TestBed.inject(ProjectsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GetProjects', () => {
    it('should send a GET request with the correct URL and query parameters', () => {
      const userId = '1';
      const expectedUrl = `${environment.base_url}/projects?member=${userId}&order_by=user_order&slight=true`;

      service.GetProjects().subscribe();

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');

      req.flush([]);
    });
  });

    it('should send a POST request with the correct URL and request body', () => {
      const userId = '1';
      const expectedUrl = `${environment.base_url}/projects?member=${userId}`;
      const projectDetails = { name: 'New Project' };

      service.AddProjects(projectDetails).subscribe();

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(projectDetails);
      req.flush([]);
    });

    it('should send a GET request with the correct URL and query parameters', () => {
      const slug = 'project-slug';
      const expectedUrl = `${environment.base_url}/projects?slug=${slug}`;
      service.GetTeam(slug).subscribe();
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });
});
