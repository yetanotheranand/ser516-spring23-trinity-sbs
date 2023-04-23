import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EpicService } from 'src/app/services/epic.service';

@Component({
  selector: 'app-epic-edit',
  templateUrl: './epic-edit.component.html',
  styleUrls: ['./epic-edit.component.css']
})
export class EpicEditComponent implements OnInit {
  addEpicForm: FormGroup;
  epicId: number;
  projectMembers: any;

  constructor(
    private formBuilder: FormBuilder,
    private epicService: EpicService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.addEpicForm = this.formBuilder.group({
      color: ['', Validators.required],
      subject: ['', Validators.required],
      description: [''],
      assigned_to: ['', Validators.required],
      clientRequirement: [''],
      tags: this.formBuilder.array([]),
      version : ['']
    });
  }

  ngOnInit(): void {
    this.getProjMembers();
    this.epicId = +this.route.snapshot.params['id'];
    const epicData = history.state?.epicData;
  
    if (!epicData) {
      this.router.navigate(['/projects']);
      return;
    }
  
    const epic = Array.isArray(epicData) ? epicData.find((epic: any) => epic.id === this.epicId) : epicData;
  
    this.addEpicForm = this.formBuilder.group({
      color: [epic?.color || '', Validators.required],
      subject: [epic?.subject || '', Validators.required],
      assigned_to: [epic?.assigned_to || '', Validators.required],
      clientRequirement: [epic?.clientRequirement || true],
      tags: this.formBuilder.array([]),
      version : [epic?.version]
    });
  
    if (epic?.tags?.length > 0) {
      for (const tag of epic.tags) {
        this.tags.push(this.formBuilder.control(tag));
      }
    };
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
  

  get tags(): FormArray {
    return this.addEpicForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(this.formBuilder.control(''));
  }

  onSubmit(): void {
    const formData = this.addEpicForm.value;
    formData.id = this.epicId;
    const projectId = parseInt(
      this.epicService.getProjDetails(
        this.route.snapshot.paramMap.get('slug')
      ).id
    );
    formData.project = projectId;
    formData.version = this.addEpicForm.get('version').value;
    
    this.epicService.updateEpic(formData).subscribe(
      (data) => {
        () => this.router.navigate(['../'], { relativeTo: this.route })
        console.log(data);
      },
      (error) => {
        // replace with actual code to handle error
        console.log(error);
      }
    );
  }
}
