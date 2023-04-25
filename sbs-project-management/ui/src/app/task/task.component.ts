import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  addTaskForm: FormGroup;
  projectMembers: any;
  project: any;
  projectId: any;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    // throw new Error('Method not implemented.');
    this.getProjMembers();
    this.id = this.route.snapshot.paramMap.get('slug');

    sessionStorage.getItem('Projects');
    const projectsString = sessionStorage.getItem('Projects');
    if (projectsString) {
      const projects = JSON.parse(projectsString);
      this.project = projects.filter((project) => project.slug === this.id)[0];
      if (this.project) {
        this.projectId = this.project.id;
      }
    }
    this.addTaskForm = this.formBuilder.group({
      subject: ['', Validators.required],
      description: '',
      assigned_to: 0,
      status: '',
      project: this.projectId,
      user_story: this.route.snapshot.paramMap.get('usid'),
    });
  }

  // task: {
  //   subject: string;
  //   description: string;
  //   assignedTo: string;
  //   status: string;
  // } = {
  //   subject: '',
  //   description: '',
  //   assignedTo: '',
  //   status: 'New',
  // };

  // ngOnit(){

  // }
  getProjMembers() {
    this.taskService
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
  createTask() {
    this.taskService.addTask(this.addTaskForm.value).subscribe(
      () => this.router.navigate(['../'], { relativeTo: this.route }),
      (err) => console.log(err)
    );
    console.log(this.addTaskForm.value);
    // code to store the task in the database or other storage
  }
}
