import { Component } from '@angular/core';
import { GetApiService } from './get-api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tableData: any[] = [
      { focusfactor: 0.75, wiplimit: 6, businessvalue: 100, storypoints: 122, storiescompleted: 38, velocity: 3.8 , workcapacity: 4.5 }
      ];
  title = 'ui';
  constructor(private api: GetApiService) {}
  ngOnInit() {
    this.api.apicall().subscribe((data) => {
      console.log(data);
    });
  }
}
