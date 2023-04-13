import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectsService } from './projects.service';

fdescribe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectsService]
    });
    service = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
