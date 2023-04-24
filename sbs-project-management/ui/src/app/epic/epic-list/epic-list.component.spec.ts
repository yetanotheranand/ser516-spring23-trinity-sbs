import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicListComponent } from './epic-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EpicService } from 'src/app/services/epic.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { of } from 'rxjs';

fdescribe('EpicListComponent', () => {
  let component: EpicListComponent;
  let fixture: ComponentFixture<EpicListComponent>;

  let service: EpicService;
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
    service = TestBed.inject(EpicService);
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
  it('should test getEpecList method', () => {
    spyOn(service, 'getEpicList').and.returnValue(of([]));
    component.getEpecList('ser516proj2-456');
    expect(service.getEpicList).toHaveBeenCalled();
  });
  it('should test editEpic method', () => {
    spyOn(component.router, 'navigate').and.callFake(() =>
      Promise.resolve(true)
    );
    component.editEpic(1212);
    expect(component.router.navigate).toHaveBeenCalledWith(
      ['/projects', 'ser516proj2-456', 'epics', 1212, 'edit'],
      {
        state: {
          epicData: {
            id: 1212,
            epicNo: 1212,
            subject: 'subject',
            description: 'description',
            clientRequirement: true,
            status: 'Assigned',
            assignedTo: 'U801951',
            version: component.dataSource[0].version,
          },
        },
      }
    );
  });

  it('should test deleteEpic method', () => {
    spyOn(component.epicService, 'deleteEpic').and.returnValue(of(null));
    spyOn(component, 'getEpecList');
    component.deleteEpic(1212);
    expect(component.epicService.deleteEpic).toHaveBeenCalledWith(1212);
    expect(component.getEpecList).toHaveBeenCalledWith('ser516proj2-456');
  });
});
