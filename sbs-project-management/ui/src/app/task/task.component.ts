import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  task: {
    subject: string,
    description: string,
    assignedTo: string,
    status: string
  } = {
    subject: '',
    description: '',
    assignedTo: '',
    status: 'New'
  };

  createTask() {
    // code to store the task in the database or other storage
  }
}
