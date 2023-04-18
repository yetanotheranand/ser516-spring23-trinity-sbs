import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GetApiService } from './get-api.service';

describe('GetApiService', () => {
  let service: GetApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetApiService],
    });
    service = TestBed.inject(GetApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
