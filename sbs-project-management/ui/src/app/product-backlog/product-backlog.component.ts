import { Component } from '@angular/core';

@Component({
  selector: 'app-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.css'],
})
export class ProductBacklogComponent {
  // Replace list of user story data obtained from Taiga API in productBacklogData.
  productBacklogData = [
    {
      name: 'User Story 1',
      status: 'New',
    },
    {
      name: 'User Story 2',
      status: 'In progress',
    },
    {
      name: 'User Story 3',
      status: 'Ready to Test',
    },
  ];
}
