import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private httpClient: HttpClient) {}
  GetProjects(): Observable<any> {
    const url = environment.base_url + '/projects';
    return this.httpClient.get(
      url +
        `?member=${sessionStorage.getItem(
          'UserId'
        )}&order_by=user_order&slight=true`
    );
  }

  AddProjects(projectDetails: any): Observable<any> {
    const url = environment.base_url + '/projects';
    const userId = sessionStorage.getItem('UserId')
      ? sessionStorage.getItem('UserId')
      : null;

    return this.httpClient.post(url + `?member=${userId}`, projectDetails);
  }

  GetTeam(slug: string): Observable<any> {
    const url = environment.base_url + '/projects';
    return this.httpClient.get(url + `?slug=${slug}`);
  }
}
