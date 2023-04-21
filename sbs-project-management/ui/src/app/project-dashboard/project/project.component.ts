import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('slug');
    console.log(this.route.snapshot.paramMap.get('slug'));
    // this.projects = sessionStorage.getItem('Projects');
    // if (this.projects) {
    //   this.project = JSON.parse(this.projects).filter(
    //     (e) => e.slug == this.id
    //   )[0];
    //   this.projectName = this.project.name;
    //   this.projectDescription = this.project.description;
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
    this.router.navigate(['/projects', this.projectSlug, 'team']);
  }
}
