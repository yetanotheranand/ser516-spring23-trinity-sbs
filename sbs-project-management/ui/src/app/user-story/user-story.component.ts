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
    uxPoints: '',
    designPoints: '',
    frontPoints: '',
    backPoints: '',
  };

  onSubmit() {
    console.log(this.userStoryData);
  }
}
