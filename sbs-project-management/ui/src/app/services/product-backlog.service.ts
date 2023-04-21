import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductBacklogService {
  constructor(private httpClient: HttpClient) {}
  listprojects(id:any): Observable<any> {
    const url = environment.base_url + '/userstories?project='+id;
    return this.httpClient.get(
      url
    );
  }
  deleteUserStory(id:any): Observable<any> {
    const url = environment.base_url + '/userstories/'+id;
    return this.httpClient.delete(
      url
    );
  }
}
