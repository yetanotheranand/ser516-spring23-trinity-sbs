import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EpicService } from 'src/app/services/epic.service';

@Component({
  selector: 'app-new-epic',
  templateUrl: './new-epic.component.html',
  styleUrls: ['./new-epic.component.css'],
})
export class NewEpicComponent implements OnInit {
  addEpicForm: FormGroup;
  projectMembers: any;

  constructor(
    private formBuilder: FormBuilder,
    private epicService: EpicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getProjMembers();
    this.addEpicForm = this.formBuilder.group({
      color: '',
      subject: ['', Validators.required],
      description: '',
      assigned_to: 0,
      clientRequirement: false,
      status: '',
      tags: this.formBuilder.array([this.formBuilder.control('')]),
      project: parseInt(
        this.epicService.getProjDetails(
          this.route.snapshot.paramMap.get('slug')
        ).id
      ),
    });
  }

  getProjMembers() {
    console.log('Hello');
    this.epicService
      .getProjMembers(this.route.snapshot.paramMap.get('slug'))
      .subscribe(
        (data) => {
          console.log(data);
          this.projectMembers = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  addTag(): void {
    this.tags.push(this.formBuilder.control(''));
  }

  get tags(): FormArray {
    return this.addEpicForm.get('tags') as FormArray;
  }

  onSubmit() {
    console.log(this.addEpicForm.value);
    const EpicDetails = {
      color: '',
      subject: ['', Validators.required],
      description: '',
      assigned_to: 0,
      clientRequirement: false,
      status: '',
      tags: this.formBuilder.array([this.formBuilder.control('')]),
      project: parseInt(
        this.epicService.getProjDetails(
          this.route.snapshot.paramMap.get('slug')
        ).id
      ),
    };
    this.epicService.addEpic(this.addEpicForm.value).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
  }
}
