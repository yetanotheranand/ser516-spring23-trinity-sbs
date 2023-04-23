import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicListComponent } from './epic-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EpicService } from 'src/app/services/epic.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of, throwError } from 'rxjs';

fdescribe('EpicListComponent', () => {
  let component: EpicListComponent;
  let fixture: ComponentFixture<EpicListComponent>;
  let epicService: EpicService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpicListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, RouterModule],
      providers: [
        EpicService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'ser516proj2-456', // Provide a sample slug value
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EpicListComponent);
    component = fixture.componentInstance;
    epicService = TestBed.inject(EpicService);
    fixture.detectChanges();
    component.dataSource = [
      {
        id: 1212,
        epicNo: 1212,
        subject: 'subject',
        description: 'description',
        clientRequirement: true,
        status: 'Assigned',
        assignedTo: 'U801951',
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    spyOn(component, 'getEpecList');
    component.ngOnInit();
    expect(component.getEpecList).toHaveBeenCalled();
  });

  it('should delete epic when user confirms', () => {
    const id = 1212;
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(epicService, 'deleteEpic').and.returnValue(of({}));
    spyOn(component, 'getEpecList');
    component.deleteEpic(id);
    expect(window.confirm).toHaveBeenCalled();
    expect(epicService.deleteEpic).toHaveBeenCalledWith(id);
    expect(component.getEpecList).toHaveBeenCalled();
  });

  it('should not delete epic when user cancels', () => {
    const id = 1212;
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(epicService, 'deleteEpic').and.stub();
    spyOn(component, 'getEpecList');
    component.deleteEpic(id);
    expect(window.confirm).toHaveBeenCalled();
    expect(epicService.deleteEpic).not.toHaveBeenCalled();
    expect(component.getEpecList).not.toHaveBeenCalled();
  });

  it('should set the dataSource property with the returned data when the service call succeeds', () => {
    const slug = 'ser516proj2-456';
    const expectedData = [
      {
        id: 1,
        epicNo: 1,
        subject: 'Test',
        description: 'Test',
        clientRequirement: true,
        status: 'New',
        assignedTo: 'Test',
      },
    ];
    spyOn(epicService, 'getEpicList').and.returnValue(of(expectedData));
    component.getEpecList(slug);
    expect(component.dataSource).toEqual(expectedData);
  });

  it('should log the error when the service call fails', () => {
    const slug = 'ser516proj2-456';
    const expectedError = new Error('Test error');
    spyOn(epicService, 'getEpicList').and.returnValue(
      throwError(expectedError)
    );
    spyOn(console, 'log');
    component.getEpecList(slug);
    expect(console.log).toHaveBeenCalledWith(expectedError);
  });
});
