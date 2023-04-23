import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpicService } from 'src/app/services/epic.service';

@Component({
  selector: 'app-epic-list',
  templateUrl: './epic-list.component.html',
  styleUrls: ['./epic-list.component.css'],
})
export class EpicListComponent implements OnInit {
  dataSource: any;
  slug: string;

  constructor(
    private epicService: EpicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEpecList(this.route.snapshot.paramMap.get('slug'));
  }

  getEpecList(slug) {
    this.epicService.getEpicList(slug).subscribe(
      (data) => {
        this.dataSource = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editEpic(id) {
    const slug = this.route.snapshot.paramMap.get('slug');
    let epicData = null;
    for (const prop in this.dataSource) {
      if (this.dataSource.hasOwnProperty(prop) && this.dataSource[prop].id === id) {
        epicData = this.dataSource[prop];
        console.log(epicData)
        break;
      }
    }
    if (epicData) {
      epicData = { ...epicData, version: epicData.version };
      this.router.navigate(['/projects', slug, 'epics', id, 'edit'], { state: { epicData } });
      console.log(epicData);
    } else {
      console.log(`Epic with id ${id} not found in the dataSource.`);
    }
  }  

  deleteEpic(id) {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (confirm('Are you sure you want to delete this epic?')) {
      this.epicService.deleteEpic(id).subscribe(
        (data) => {
          this.getEpecList(slug);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
