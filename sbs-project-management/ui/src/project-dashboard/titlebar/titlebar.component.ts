import { Component } from '@angular/core';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css'],
})
export class TitlebarComponent {
  projects = [
    { name: 'Project A', description: 'Description of Project A' },
    { name: 'Project B', description: 'Description of Project B' },
    { name: 'Project C', description: 'Description of Project C' }
  ];
}
