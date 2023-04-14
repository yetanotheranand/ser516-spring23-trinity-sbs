import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-operations',
  templateUrl: './project-operations.component.html',
  styleUrls: ['./project-operations.component.css'],
})
export class ProjectOperationsComponent {
  projects: any;
  slug: string;
  project: any;
  constructor(private route: ActivatedRoute) {
    this.slug = this.route.snapshot.paramMap.get('slug');
    const segments = this.route.snapshot.url;
    this.slug = segments[segments.length - 1].path;
    console.log(this.slug); // log the last segment of the route
    this.projects = sessionStorage.getItem('Projects');
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.project = JSON.parse(this.projects).filter(
      (e) => e.slug == this.slug
    )[0];
    console.log(this.project.name);
  }
  onBoxClick(name: string) {
    console.log(`Clicked on box with name: ${name}`);
  }
}
