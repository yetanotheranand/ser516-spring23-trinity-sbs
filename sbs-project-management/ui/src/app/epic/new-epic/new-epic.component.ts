import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-epic',
  templateUrl: './new-epic.component.html',
  styleUrls: ['./new-epic.component.css'],
})
export class NewEpicComponent {
  addEpicForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addEpicForm = this.formBuilder.group({
      color: '',
      subject: ['', Validators.required],
      description: '',
      assignedTo: '',
      clientRequirement: false,
      status: '',
      tags: this.formBuilder.array([this.formBuilder.control('')]),
    });
  }

  addTag(): void {
    this.tags.push(this.formBuilder.control(''));
  }

  get tags(): FormArray {
    return this.addEpicForm.get('tags') as FormArray;
  }

  onSubmit() {
    console.log(this.addEpicForm.value);
  }
}
