import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TaskComponent } from './task.component';

fdescribe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the task subject and description', () => {
    const subjectElement = fixture.debugElement.query(By.css('#subject'));
    const descriptionElement = fixture.debugElement.query(
      By.css('#description')
    );

    expect(subjectElement.nativeElement.textContent).toBe(
      component.task.subject
    );
    expect(descriptionElement.nativeElement.textContent).toBe(
      component.task.description
    );
  });

  it('should display the assigned user', () => {
    const assignedToElement = fixture.debugElement.query(By.css('#assignedTo'));

    expect(assignedToElement.nativeElement.textContent).toBe(
      component.task.assignedTo
    );
  });

  it('should display the task status', () => {
    const statusElement = fixture.debugElement.query(By.css('#status'));

    expect(statusElement.nativeElement.value).toBe(component.task.status);
  });
});
