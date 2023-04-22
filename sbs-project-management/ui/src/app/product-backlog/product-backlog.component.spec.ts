import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { convertToParamMap, ActivatedRoute } from '@angular/router';
import { ProductBacklogComponent } from './product-backlog.component';
import { ProductBacklogService } from '../services/product-backlog.service';

fdescribe('ProductBacklogComponent', () => {
  let component: ProductBacklogComponent;
  let fixture: ComponentFixture<ProductBacklogComponent>;
  let mockBacklogService: jasmine.SpyObj<ProductBacklogService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockBacklogService = jasmine.createSpyObj<ProductBacklogService>([
      'listprojects',
    ]);

    mockActivatedRoute = {
      queryParamMap: of(convertToParamMap({})),
    };

    await TestBed.configureTestingModule({
      declarations: [ProductBacklogComponent],
      providers: [
        { provide: ProductBacklogService, useValue: mockBacklogService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBacklogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the listprojects method of the backlog service when getUserStories is called', () => {
    const mockData = ['user story 1', 'user story 2'];
    mockBacklogService.listprojects.and.returnValue(of(mockData));
    component.id = '123';
    component.getUserStories();
    expect(mockBacklogService.listprojects).toHaveBeenCalledWith('123');
    expect(component.productBacklogData).toEqual(mockData);
  });

  it('should set the productBacklogData property when getUserStories is called', () => {
    const mockData = ['user story 1', 'user story 2'];
    mockBacklogService.listprojects.and.returnValue(of(mockData));
    component.id = '123';
    component.getUserStories();
    expect(component.productBacklogData).toEqual(mockData);
  });

  it('should not set the productBacklogData property when listprojects call fails', () => {
    mockBacklogService.listprojects.and.returnValue(
      throwError({ status: 401 })
    );
    component.id = '123';
    component.getUserStories();
    expect(component.productBacklogData).toBeUndefined();
  });

  it('should set the productBacklogData property to an empty array when listprojects returns an empty array', () => {
    mockBacklogService.listprojects.and.returnValue(of([]));
    component.id = '123';
    component.getUserStories();
    expect(component.productBacklogData).toEqual([]);
  });

  it('should not set the productBacklogData property when listprojects call fails with a status other than 401', () => {
    mockBacklogService.listprojects.and.returnValue(
      throwError({ status: 500 })
    );
    component.id = '123';
    component.getUserStories();
    expect(component.productBacklogData).toBeUndefined();
  });

  it('should not set the productBacklogData property when listprojects call fails', () => {
    mockBacklogService.listprojects.and.returnValue(
      throwError({ status: 401 })
    );
    component.id = '123';
    component.getUserStories();
    expect(component.productBacklogData).toBeUndefined();
  });

  it('should not set the productBacklogData property when listprojects call returns an empty array', () => {
    mockBacklogService.listprojects.and.returnValue(of([]));
    component.id = '123';
    component.getUserStories();
    expect(component.productBacklogData).toEqual([]);
  });

  it('should set the productBacklogData property to an empty array when listprojects returns an empty array', () => {
    mockBacklogService.listprojects.and.returnValue(of([]));
    component.getUserStories();
    expect(component.productBacklogData).toEqual([]);
  });
});
