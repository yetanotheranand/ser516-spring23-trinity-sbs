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
  project: { id: string; name: string; description: string };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('slug');
    console.log(this.route.snapshot.paramMap.get('slug'))
    this.projects = sessionStorage.getItem('Projects');
    if (this.projects) {
      this.project = JSON.parse(this.projects).filter(
        (e) => e.slug == this.id
      )[0];
      this.projectName = this.project.name;
      this.projectDescription = this.project.description;
    }
  }

  onTeamsClick() {
    // write navigation on clicking the button here
  }
}
