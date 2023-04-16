import { Component } from '@angular/core';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css'],
})
export class SimulatorComponent {
  isEditable = true;
  userStories = [
    {
      title: 'US1 - asdsad',
      description: 'this is adsdasda',
      businessValue: 3,
      storyPoints: 8,
      assignedTo: 'Person',
      attachments: 'asdasd',
      tags: 'asdas',
      tasks: [
        {
          id: 1,
          title: 'asdasd',
          description: 'asd',
          businessValue: 2,
          storyPoints: 2,
          assignedTo: 'Person',
          attachments: null,
          tags: 'asd',
        },
        {
          id: 2,
          title: 'asdasd',
          description: 'asd',
          businessValue: 2,
          storyPoints: 2,
          assignedTo: 'Person',
          attachments: null,
          tags: 'asd',
        },
        {
          id: 3,
          title: 'asdasd',
          description: 'asd',
          businessValue: 2,
          storyPoints: 2,
          assignedTo: 'Person',
          attachments: null,
          tags: 'asd',
        },
      ],
    },
    {
      title: 'US1 - asdsad',
      description: 'this is adsdasda',
      businessValue: 3,
      storyPoints: 8,
      assignedTo: 'Person',
      attachments: 'asdasd',
      tags: 'asdas',
      tasks: [
        {
          id: 1,
          title: 'asdasd',
          description: 'asd',
          assignedTo: 'Person',
          attachments: null,
          tags: 'asd',
        },
        {
          id: 2,
          title: 'asdasd',
          description: 'asd',
          assignedTo: 'Person',
          attachments: null,
          tags: 'asd',
        },
        {
          id: 3,
          title: 'asdasd',
          description: 'asd',
          assignedTo: 'Person',
          attachments: null,
          tags: 'asd',
        },
      ],
    },
  ];
  constructor() {}
}
