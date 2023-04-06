import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  projects = [
    { name: 'Project A', description: 'Description of Project A' },
    { name: 'Project B', description: 'Description of Project B' },
    { name: 'Project C', description: 'Description of Project C' },
  ];
  deleteAlert(event: any) {
    const result = confirm('Are you sure to proceed?');
    if (result === false) {
      event.preventDefault();
    }
  }
}