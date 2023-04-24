import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoryService {
  constructor(private httpClient: HttpClient) {}

  addUserStory(userStoryData: any): Observable<any> {
    const url =
      environment.base_url + '/userstories?projectid=' + userStoryData.project;
    console.log(userStoryData);
    return this.httpClient.post(url, userStoryData);
  }
  getUserStoryDetails(usID: any) {
    const url = environment.base_url + '/userstories/' + usID;
    return this.httpClient.get(url);
  }
}
