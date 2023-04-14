import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StringArraySupportOption } from 'prettier';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: any;
  id: string;

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.projects = sessionStorage.getItem('Projects');
  }

  project: { id: string; name: string; description: string };

  ngOnInit(): void {
    this.project = JSON.parse(this.projects).filter((e) => e.id == this.id)[0];
  }
}
