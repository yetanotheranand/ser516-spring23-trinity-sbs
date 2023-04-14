import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit{
  errorMessage: string;
  projects: any;

  constructor(
    private ProjectsService: ProjectsService,
    private router: Router
  ) {
    console.log('Auth', sessionStorage.getItem('JWTToken'));
  }

  onProjectClick(slug:number) {
    debugger;
    this.router.navigateByUrl(`/projects/${slug}`);
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

  getProjects(){
    this.ProjectsService.GetProjects().subscribe(
      (data) => {
        this.projects = data;
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
}
