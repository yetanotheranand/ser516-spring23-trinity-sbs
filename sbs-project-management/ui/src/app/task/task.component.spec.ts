import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './task.component';

fdescribe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TaskComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default task values', () => {
    expect(component.task.subject).toEqual('');
    expect(component.task.description).toEqual('');
    expect(component.task.assignedTo).toEqual('');
    expect(component.task.status).toEqual('New');
  });

  it('should call createTask method when button is clicked', () => {
    spyOn(component, 'createTask');

    const button = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));

    expect(component.createTask).toHaveBeenCalled();
  });
});
