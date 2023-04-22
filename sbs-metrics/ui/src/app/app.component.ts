import { Component } from '@angular/core';
import { GetApiService } from './get-api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tableData: any[] = [
      { focusfactor: 88, wiplimit: 25, businessvalue: 99, storypoints: 22, storiescompleted: 10 }
      ];
  title = 'ui';
  constructor(private api: GetApiService) {}
  ngOnInit() {
    this.api.apicall().subscribe((data) => {
      console.log(data);
    });
  }
}
