import { TestBed } from '@angular/core/testing';

import { ProductBacklogService } from './product-backlog.service';

fdescribe('ProductBacklogService', () => {
  let service: ProductBacklogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductBacklogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
