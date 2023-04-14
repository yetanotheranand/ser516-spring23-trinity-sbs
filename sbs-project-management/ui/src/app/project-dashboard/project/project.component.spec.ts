import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectComponent } from './project.component';
import { ActivatedRoute } from '@angular/router';

class ActivatedRouteStub {
  snapshot = {
    paramMap: {
      get: (key: string) => {
        return '123'; // Return a mock value for 'id'
      },
    },
  };
}
fdescribe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectComponent],
      imports: [MatCardModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    component.projects =
      '[{ "id": "1", "name": "Project 1", "description":"description" }, { "id": "2", "name": "Project 2", "description":"description"}]';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse projects and filter by id', () => {
    component.projects =
      '[{ "id": "1", "name": "Project 1", "description":"description" }, { "id": "2", "name": "Project 2", "description":"description"}]';
    component.id = '1';
    component.ngOnInit();
    expect(component.projectName).toBeDefined();
    expect(component.projectDescription).toBeDefined();
  });
});
