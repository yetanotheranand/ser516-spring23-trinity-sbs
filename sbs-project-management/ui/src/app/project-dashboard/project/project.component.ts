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
  projectSlug = '';
  project: { id: string; name: string; description: string; slug: any };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('slug');
    const projectsString = sessionStorage.getItem('Projects');
    if (projectsString) {
      const projects = JSON.parse(projectsString);
      this.project = projects.filter((project) => project.slug === this.id)[0];
      if (this.project) {
        this.projectName = this.project.name;
        this.projectDescription = this.project.description;
        this.projectSlug = this.project.slug;
      }
    }
  }

  onTeamsClick() {
    // write navigation on clicking the button here
  }
}
