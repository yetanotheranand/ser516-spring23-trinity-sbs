import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductBacklogService } from './product-backlog.service';
import { environment } from 'src/environment/environment';

fdescribe('ProductBacklogService', () => {
  let service: ProductBacklogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductBacklogService],
    });
    service = TestBed.inject(ProductBacklogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the listprojects method with the project id in the query params', () => {
    const id = 1234;
    const mockResponse = [
      { id: 1, title: 'User Story 1' },
      { id: 2, title: 'User Story 2' },
    ];
    service.listprojects(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const url = environment.base_url + '/userstories?projectid=' + id;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
