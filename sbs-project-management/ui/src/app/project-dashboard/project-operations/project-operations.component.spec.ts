import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOperationsComponent } from './project-operations.component';

describe('ProjectOperationsComponent', () => {
  let component: ProjectOperationsComponent;
  let fixture: ComponentFixture<ProjectOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
