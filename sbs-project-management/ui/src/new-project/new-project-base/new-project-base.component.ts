import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-project-base',
  templateUrl: './new-project-base.component.html',
  styleUrls: ['./new-project-base.component.css']
})
export class NewProjectBaseComponent implements OnInit {
  projectName: string = '';
  projectDescription: string = '';

  constructor(private router: Router, private route: ActivatedRoute) 
  {

  }

  ngOnInit(){
    this.projectName = '';
    this.projectDescription = '';
  }

  navigateBack(){
      this.router.navigate(['../projects'], { relativeTo: this.route });
  }

}
