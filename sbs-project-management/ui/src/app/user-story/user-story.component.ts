/* eslint-disable prettier/prettier */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoryService } from '../services/user-story.service';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css'],
})
export class UserStoryComponent {
  uxPoints: any;
  designPoints: any;
  frontPoints: any;
  backPoints: any;
  userStoryData : any = {
      "points": 0,
      "description": '',
      "project": '',
      "status": '',
      "subject": '',
  };
  id: any;
  constructor(
    private userStoryService: UserStoryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParamMap.subscribe((params) => {
    this.id = params.get('projectid') || '';
    console.log(this.id);
    if (this.id != null) {
      this.userStoryData = {
        "points": 0,
        "description": '',
        "project": this.id,
        "status": '',
        "subject": '',
      };
      this.onSubmit();
    }
  });
  
}
  onSubmit() {
    this.userStoryData.points =
      this.uxPoints +
      this.designPoints +
      this.frontPoints +
      this.backPoints;
      console.log(this.userStoryData);
      this.userStoryService.addUserStory(this.userStoryData).subscribe(
        () => this.router.navigate(['../'], { relativeTo: this.route }),
        err => console.error(err)
      );
  }
}
