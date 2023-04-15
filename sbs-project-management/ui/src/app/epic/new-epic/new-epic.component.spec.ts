import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NewEpicComponent } from './new-epic.component';

fdescribe('NewEpicComponent', () => {
  let component: NewEpicComponent;
  let fixture: ComponentFixture<NewEpicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [NewEpicComponent],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the correct controls', () => {
    expect(component.addEpicForm.contains('color')).toBeTrue();
    expect(component.addEpicForm.contains('subject')).toBeTrue();
    expect(component.addEpicForm.contains('description')).toBeTrue();
    expect(component.addEpicForm.contains('assignedTo')).toBeTrue();
    expect(component.addEpicForm.contains('clientRequirement')).toBeTrue();
    expect(component.addEpicForm.contains('status')).toBeTrue();
    expect(component.addEpicForm.contains('tags')).toBeTrue();
  });

  it('should validate the subject field', () => {
    const subject = component.addEpicForm.controls['subject'];
    expect(subject.valid).toBeFalsy();

    subject.setValue('Test Subject');
    expect(subject.valid).toBeTruthy();
  });

  it('should add a tag to the tags array', () => {
    expect(component.tags.length).toBe(1);

    component.addTag();
    expect(component.tags.length).toBe(2);
  });
});
