import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class EpicService {
  slug: string;
  project: any;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}

  getEpicList(slug: any) {
    // this.slug= this.route.snapshot.paramMap.get('slug');
    const projectsString = sessionStorage.getItem('Projects');
    if (projectsString) {
      const projects = JSON.parse(projectsString);
      this.project = projects.filter((project) => project.slug === slug)[0];
    }
    const url = environment.base_url + `/epics?project=${this.project.id}`;
    return this.httpClient.get(url);
  }

  addEpic(epicDetails: any) {
    const url = environment.base_url + '/epics';
    console.log('addd epics called');
    return this.httpClient.post(url, epicDetails);
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
    const url = environment.base_url + '/users?project=';
    console.log(slug);
    const projectsString = sessionStorage.getItem('Projects');
    if (projectsString) {
      const projects = JSON.parse(projectsString);
      ProjectDetails = projects.filter((project) => project.slug === slug)[0];
    }
    console.log(ProjectDetails.id);
    return this.httpClient.get(url + ProjectDetails.id);
  }
}
