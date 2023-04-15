import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class EpicService {
  constructor(private httpClient: HttpClient) {}

  getEpicList() {
    const url = environment.base_url + '/api/v1/epics';
    return this.httpClient.get(url);
  }
}
