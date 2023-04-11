import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  projects: any;
  // constructor(public router:Router) {
  //   this.projects= sessionStorage.getItem("projects")
  // }
  id: string;
  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.projects = sessionStorage.getItem('Projects');
  }

  project: any;
  ngOnInit(): void {
    this.project = JSON.parse(this.projects).filter((e) => e.id == this.id)[0];
    console.log(this.project);
    // this.id = this.route.snapshot.paramMap.get('id')
    // this.projects= sessionStorage.getItem("projects")
    // console.log("dfghjkl;lkjcv",sessionStorage.getItem("projects") && sessionStorage.getItem("projects")[0])
  }
}
