import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EpicService } from 'src/app/services/epic.service';
import { EpicEditComponent } from './epic-edit.component';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormArray } from '@angular/forms';

fdescribe('EpicEditComponent', () => {
  let component: EpicEditComponent;
  let fixture: ComponentFixture<EpicEditComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let formBuilder: FormBuilder;
  let epicService: EpicService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let route: ActivatedRoute;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpicEditComponent],
      imports: [HttpClientTestingModule],
      providers: [
        FormBuilder,
        EpicService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'testSlug',
              },
              params: {
                id: 1,
              },
            },
          },
        },
        {
          provide: Router,
          useValue: {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            navigate: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicEditComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    epicService = TestBed.inject(EpicService);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to projects if no epicData is found', () => {
    spyOn(component.router, 'navigate');

    component.ngOnInit();

    expect(component.router.navigate).toHaveBeenCalledWith(['/projects']);
  });

  // it('should initialize form with empty values if no epicData is found and navigate to projects', () => {
  //   spyOn(component.router, 'navigate');
  //   spyOn(history, 'state').and.returnValue({});

  //   component.ngOnInit();

  //   expect(component.router.navigate).toHaveBeenCalledWith(['/projects']);
  //   expect(component.addEpicForm.value).toEqual({
  //     color: '',
  //     subject: '',
  //     assigned_to: '',
  //     clientRequirement: true,
  //     tags: [],
  //     version: null,
  //   });
  // });

  it('should return the tags FormArray', () => {
    expect(component.tags).toEqual(
      component.addEpicForm.get('tags') as FormArray
    );
  });

  it('should add a new tag control to the tags FormArray', () => {
    component.addTag();
    expect(component.tags.length).toEqual(1);
  });

  it('should retrieve project members successfully', () => {
    const mockData = [
      { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
      { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
    ];
    spyOn(epicService, 'getProjMembers').and.returnValue(of(mockData));
    component.getProjMembers();
    expect(epicService.getProjMembers).toHaveBeenCalled();
    expect(component.projectMembers).toEqual(mockData);
  });

  it('should handle error when retrieving project members', () => {
    const error = 'Internal server error';
    spyOn(epicService, 'getProjMembers').and.returnValue(throwError(error));
    spyOn(console, 'log');
    component.getProjMembers();
    expect(epicService.getProjMembers).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(error);
    expect(component.projectMembers).toBeUndefined();
  });

  // it('should call the updateEpic method of the epicService with the correct data', () => {
  //   spyOn(component.router, 'navigate');
  //   spyOn(component.epicService, 'updateEpic').and.callThrough();

  //   const projectId = 1;

  //   component.addEpicForm.setValue({
  //     color: 'blue',
  //     subject: 'Test Epic',
  //     assigned_to: 'John Doe',
  //     clientRequirement: true,
  //     tags: ['tag1', 'tag2'],
  //     version: '1.0'
  //   });

  //   component.onSubmit();

  //   expect(component.epicService.updateEpic).toHaveBeenCalledWith({
  //     color: 'blue',
  //     subject: 'Test Epic',
  //     assigned_to: 'John Doe',
  //     clientRequirement: true,
  //     tags: ['tag1', 'tag2'],
  //     version: '1.0',
  //     id: undefined,
  //     project: projectId
  //   });

  //   expect(component.router.navigate).toHaveBeenCalledWith(['../'], { relativeTo: component.route });
  // });
});
