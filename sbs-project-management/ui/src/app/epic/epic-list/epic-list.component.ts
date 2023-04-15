import { Component, OnInit } from '@angular/core';
import { EpicService } from 'src/app/services/epic.service';

@Component({
  selector: 'app-epic-list',
  templateUrl: './epic-list.component.html',
  styleUrls: ['./epic-list.component.css'],
})
export class EpicListComponent implements OnInit {
  dataSource = [
    {
      epicNo: 1212,
      subject: 'subject',
      description: 'description',
      clientRequirement: true,
      status: 'Assigned',
      assignedTo: 'U801951',
    },
    {
      epicNo: 1566,
      subject: 'subject 2',
      description: 'test description',
      clientRequirement: true,
      status: 'Assigned',
      assignedTo: 'u738273',
    },
    {
      epicNo: 12781772,
      subject: 'test subject',
      description: 'description test test ',
      clientRequirement: true,
      status: 'Assigned',
      assignedTo: 'U801951',
    },
    {
      epicNo: 677187,
      subject: 'test subject test',
      description: 'test description test ',
      clientRequirement: true,
      status: 'Assigned',
      assignedTo: 'U801951',
    },
    {
      epicNo: 1212,
      subject: 'test subject new',
      description: 'test description test ',
      clientRequirement: true,
      status: 'Un-Assigned',
      assignedTo: 'U801951',
    },
    {
      epicNo: 1212,
      subject: 'subject',
      description: 'description',
      clientRequirement: true,
      status: 'Blocked',
      assignedTo: 'U801951',
    },
  ];

  constructor(private epicService: EpicService) {}

  ngOnInit(): void {
    this.getEpecList();
  }

  getEpecList() {
    this.epicService.getEpicList().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
