import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: any;
  id: string;
  projectName = '';
  projectDescription = '';
  project: any;
  slug: string;

  constructor(private route: ActivatedRoute) {
    this.slug = this.route.snapshot.paramMap.get('slug');
    const segments = this.route.snapshot.url;
    this.slug = segments[segments.length - 1].path;
    console.log(this.slug); // log the last segment of the route
    this.projects = sessionStorage.getItem('Projects');
  }

  onTeamsClick() {
    console.log('Teams button is clicked');
  }

  ngOnInit(): void {
    this.project = JSON.parse(this.projects).filter(
      (e) => e.slug == this.slug
    )[0];
    this.projectName = this.project.name;
    this.projectDescription = this.project.description;
  }
}
