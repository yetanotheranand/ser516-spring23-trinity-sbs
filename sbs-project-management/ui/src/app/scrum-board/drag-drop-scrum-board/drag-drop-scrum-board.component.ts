import {moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-drag-drop-scrum-board',
  templateUrl: './drag-drop-scrum-board.component.html',
  styleUrls: ['./drag-drop-scrum-board.component.css'],
})
export class DragDropScrumBoardComponent {
  ready = [
    { title: '#US516', description: 'sample description', status:'Ready' },
    { title: '#US456', description: 'sample description', status:'Ready'  },
    { title: '#US678', description: 'sample description', status:'Ready'  },
  ];

  inProgress = [
    { title: '#US753', description: 'sample description', status:'In Progress'  },
    { title: '#US678', description: 'sample description', status:'In Progress'  }
  ];

  testing = [
    { title: '#US765', description: 'sample description', status:'Testing'  },
    { title: '#US683', description: 'sample description', status:'Testing' }
  ];

  review = [
    { title: '#US345', description: 'sample description', status: 'Review' }
  ];

  toDo = [
    { title: '#US989', description: 'sample description', status: 'To Do' }
  ];

  done = [
    { title: '#US589', description: 'sample description', status: 'Done'  }
  ];

  waiting = [
    { title: '#US356', description: 'sample description', status: 'Waiting'  }
  ];

  blocking = [
    { title: '#US11', description: 'sample description', status: 'Blocking' }
  ];

  sprints = [
    {id: 1 , name:'Sprint 1', startDt: '20-Jan-2023', endDt: '4 Feb 2023' },
    {id: 2 , name:'Sprint 2', startDt: '5-Feb-2023', endDt: '20 Feb 2023' },
    {id: 3,  name: 'Sprint 3', startDt: '21-Feb-2023', endDt: '5-Mar-2023' }
  ]

  containers = [
    { id: 'toDo', name: 'To Do', status: 'To Do', userStories: this.toDo},
    { id: 'inProgress', name: 'In Progress', status: 'In Progress', userStories: this.inProgress},
    { id: 'testing', name: 'Testing', status: 'Testing', userStories: this.testing },
    { id: 'waiting', name: 'Waiting', status: 'Waiting', userStories: this.waiting},
    { id: 'done', name: 'Done', status: 'Done', userStories: this.done},
    { id: 'blocking', name: 'Blocking', status: 'Blocking', userStories: this.waiting},
  ];

  onDrop(event) {
    const previousContainer = this.containers.find(c => c.userStories === event.previousContainer.data);
    const currentContainer = this.containers.find(c => c.userStories === event.container.data);
    if (previousContainer === currentContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const item = previousContainer.userStories[event.previousIndex];
      item.status = currentContainer.status;
      previousContainer.userStories.splice(event.previousIndex, 1);
      currentContainer.userStories.splice(event.currentIndex, 0, item);
    }
  }

  addSprint(){

  }
}
