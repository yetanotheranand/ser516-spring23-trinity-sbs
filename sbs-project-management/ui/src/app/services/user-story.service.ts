import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserStoryService {
  constructor(private httpClient: HttpClient) {}

  getUserStoryDetails(usID: any) {
    const url = environment.base_url + '/userstories/' + usID;
    return this.httpClient.get(url);
  }
  getUserStoryTasks(usID: any) {
    const url = environment.base_url + '/tasks?user_story=' + usID;
    return this.httpClient.get(url);
  }
}
