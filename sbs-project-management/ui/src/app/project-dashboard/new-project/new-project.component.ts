import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  projectName = '';
  projectDescription = '';
  privatePublic = '';
  newProject = new FormGroup({
    projectName: new FormControl('', Validators.required),
    projectDescription: new FormControl('', Validators.required),
    privatePublic: new FormControl('', Validators.required),
  });
  errorMessage: string | undefined;
  private: '';

  constructor(
    private ProjectsService: ProjectsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log(this.newProject.get('projectName').value);
  }

  ngOnInit() {
    this.projectName = '';
    this.projectDescription = '';
    this.privatePublic = '';
  }
  newproject() {
    const ProjectDetails = {
      name: this.newProject.get('projectName').value,
      description: this.newProject.get('projectDescription').value,
      is_private: this.newProject.get('privatePublic').value,
    };
    console.log(ProjectDetails);
    this.ProjectsService.AddProjects(ProjectDetails).subscribe(
      () => this.router.navigateByUrl('/projects'),
      (error) => {
        if (error) {
          this.errorMessage = error.error.detail;
          console.log(this.errorMessage);
        }
      }
    );
  }

  navigateBack() {
    this.router.navigate(['../projects'], { relativeTo: this.route });
  }
}
