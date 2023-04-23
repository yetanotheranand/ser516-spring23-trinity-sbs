import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProjMembers();
    const id = this.epicService.getProjDetails(
      this.route.snapshot.paramMap.get('slug')
    )
      ? this.epicService.getProjDetails(
          this.route.snapshot.paramMap.get('slug')
        ).id
      : null;
    const proj_slug_id = id ? id : null;
    this.addEpicForm = this.formBuilder.group({
      color: '',
      subject: ['', Validators.required],
      description: '',
      assigned_to: 0,
      clientRequirement: false,
      status: '',
      tags: this.formBuilder.array([this.formBuilder.control('')]),
      project: parseInt(proj_slug_id),
    });
  }

  getProjMembers() {
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
    this.epicService.addEpic(this.addEpicForm.value).subscribe(
      () => this.router.navigate(['../'], { relativeTo: this.route }),
      (err) => console.log(err)
    );
  }
}
