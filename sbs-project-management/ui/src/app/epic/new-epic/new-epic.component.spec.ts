import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NewEpicComponent } from './new-epic.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

fdescribe('NewEpicComponent', () => {
  let component: NewEpicComponent;
  let fixture: ComponentFixture<NewEpicComponent>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [NewEpicComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'ser516proj2-456',
              },
            },
          },
        },
      ],
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
    expect(component.addEpicForm.contains('assigned_to')).toBeTrue();
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
