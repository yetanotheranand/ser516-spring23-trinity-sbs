import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserStoryService } from '../services/user-story.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-story-details',
  templateUrl: './user-story-details.component.html',
  styleUrls: ['./user-story-details.component.css'],
})
export class UserStoryDetailsComponent {
  constructor(
    private httpClient: HttpClient,
    private UserStoryService: UserStoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  id: any;
  userStory: any;
  OnInit(): void {
    this.id = this.route.snapshot.paramMap.get('usid');
    console.log(this.route.snapshot.paramMap.get('slug'));
    this.UserStoryService.getUserStoryDetails(this.id).subscribe(
      (data) => {
        this.userStory = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    // this.GetUserStoryDetails(this.id)
    console.log(this.userStory && this.userStory.milestone_name);
  }
}
