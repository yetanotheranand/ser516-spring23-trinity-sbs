import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  errorMessage: string;
  projects: any;

  constructor(
    private ProjectsService: ProjectsService,
    private router: Router
  ) {
    console.log('Auth', sessionStorage.getItem('JWTToken'));
  }

  onProjectClick(project: any) {
    console.log(project.target.id);
    this.router.navigateByUrl(`/projects/${project.target.id}`);
  }

  onProductBacklog(project: any) {
    console.log(project.slug);
    this.router.navigate([`/projects/${project.slug}/backlog`],{ queryParams: { projectid: project.id } })
    // this.router.navigateByUrl(`/projects/${project.slug}/backlog?projectid=`+project.id);
  }

  deleteAlert(event: any) {
    const result = confirm('Are you sure to proceed?');
    if (result === false) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.ProjectsService.GetProjects().subscribe(
      (data) => {
        this.projects = data;
        console.log(data);
        sessionStorage.setItem('Projects', JSON.stringify(data));
        // this.router.navigateByUrl('/projects');
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = error.error.detail;
        }
      }
    );
  }

  protected readonly event = event;
}
