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
  Tasks: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('usid');
    console.log(this.route.snapshot.paramMap.get('slug'));
    this.UserStoryService.getUserStoryTasks(this.id).subscribe(
      (data) => {
        this.Tasks = data;
        console.log('tasks', data);
      },
      (error) => {
        console.log(error);
      }
    );
    // this.GetUserStoryDetails(this.id)
    console.log(this.Tasks);
  }
}
