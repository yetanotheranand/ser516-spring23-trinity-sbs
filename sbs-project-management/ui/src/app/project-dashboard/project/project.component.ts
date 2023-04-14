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
  projectName: string = "";
  projectDescription: string = "";
  project: { id: string, name: string, description: string };

  constructor(private route: ActivatedRoute) {
    
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.projects = sessionStorage.getItem('Projects');
    console.log(this.projects);
    if(this.projects){
    this.project = JSON.parse(this.projects).filter((e) => e.id == this.id)[0];
    this.projectName = this.project.name;
    this.projectDescription = this.project.description;
    }
  }
}
