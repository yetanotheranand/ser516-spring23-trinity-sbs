import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-project-base',
  templateUrl: './new-project-base.component.html',
  styleUrls: ['./new-project-base.component.css']
})
export class NewProjectBaseComponent {

  constructor(private router: Router, private route: ActivatedRoute) 
  {

  }

  navigateBack(){
      this.router.navigate(['../'], { relativeTo: this.route });
  }

}
