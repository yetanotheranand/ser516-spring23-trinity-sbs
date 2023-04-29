import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  slug: string;
  project: any;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  //   getEpicList(slug: any) {
  //     const projectsString = sessionStorage.getItem('Projects');
  //     console.log('string value from sessin storage', projectsString);
  //     if (projectsString) {
  //       const projects = JSON.parse(projectsString);
  //       this.project = projects.filter((project) => project.slug === slug)[0];
  //     }
  //     const url =
  //       this.project && this.project.id
  //         ? environment.base_url + `/epics?project=${this.project.id}`
  //         : environment.base_url + `/epics`;

  //     return this.httpClient.get(url);
  //   }

  addTask(epicDetails: any) {
    const url = environment.base_url + '/tasks';
    console.log('add epics called');
    // const assId = parseInt(epicDetails.assigned_to);
    // delete epicDetails.assigned_to;
    // epicDetails.assigned_to = assId;
    // delete epicDetails.status;
    return this.httpClient.post(url, epicDetails);
  }

  getTaskById(taskId: number) {
    const url = environment.base_url + '/tasks/' + taskId;
    return this.httpClient.get(url);
  }

  getProjDetails(slug: any) {
    let ProjectDetails: any;
    const projectsString = sessionStorage.getItem('Projects');
    if (projectsString) {
      const projects = JSON.parse(projectsString);
      ProjectDetails = projects.filter((project) => project.slug === slug)[0];
    }
    return ProjectDetails;
  }

  getProjMembers(slug: any) {
    let ProjectDetails: any;
    //const url = environment.base_url + '/users?project=';
    console.log(slug);
    const projectsString = sessionStorage.getItem('Projects');
    if (projectsString) {
      const projects = JSON.parse(projectsString);
      ProjectDetails = projects.filter((project) => project.slug === slug)[0];
    }
    const url =
      ProjectDetails && ProjectDetails.id
        ? environment.base_url + `/users?project=${ProjectDetails.id}`
        : environment.base_url + `/users`;
    return this.httpClient.get(url);
  }
}
