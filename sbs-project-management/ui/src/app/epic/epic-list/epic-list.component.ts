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
      epicNo: 1212,
      subject: 'subject',
      description: 'description',
      clientRequirement: true,
      status: 'Assigned',
      assignedTo: 'U801951',
    },
    {
      epicNo: 1212,
      subject: 'subject',
      description: 'description',
      clientRequirement: true,
      status: 'Assigned',
      assignedTo: 'U801951',
    },
    {
      epicNo: 1212,
      subject: 'subject',
      description: 'description',
      clientRequirement: true,
      status: 'Assigned',
      assignedTo: 'U801951',
    },
    {
      epicNo: 1212,
      subject: 'subject',
      description: 'description',
      clientRequirement: true,
      status: 'Assigned',
      assignedTo: 'U801951',
    },
    {
      epicNo: 1212,
      subject: 'subject',
      description: 'description',
      clientRequirement: true,
      status: 'Assigned',
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

  newEpic() {}
}
