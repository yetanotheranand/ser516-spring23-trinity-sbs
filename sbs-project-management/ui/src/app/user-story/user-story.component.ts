import { Component } from '@angular/core';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css'],
})
export class UserStoryComponent {
  userStoryData = {
    name: '',
    description: '',
    status: '',
    uxPoints: 0,
    designPoints: 0,
    frontPoints: 0,
    backPoints: 0,
    points: 0,
  };

  onSubmit() {
    this.userStoryData.points = this.userStoryData.uxPoints + this.userStoryData.designPoints + 
      this.userStoryData.frontPoints + this.userStoryData.backPoints;
    console.log(this.userStoryData);
  }
}
