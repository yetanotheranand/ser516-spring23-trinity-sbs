import { Component } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  errorMessage: string | undefined;
  projects: any;

  constructor(
    private ProjectsService: ProjectsService,
    private router: Router
  ) {
    console.log('Auth', sessionStorage.getItem('JWTToken'));
    this.ProjectsService.GetProjects().subscribe(
      (data) => {
        console.log(data);
        this.projects = data;
        sessionStorage.setItem('Projects', JSON.stringify(data));
        // this.router.navigateByUrl('/projects');
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = error.error.detail;
          console.log(this.errorMessage);
        }
      }
    );
  }

  onProjectClick(event: any) {
    console.log(event.target.id);
    this.router.navigateByUrl(`/projects/${event.target.id}`);
  }

  deleteAlert(event: any) {
    const result = confirm('Are you sure to proceed?');
    if (result === false) {
      event.preventDefault();
    }
  }
}
