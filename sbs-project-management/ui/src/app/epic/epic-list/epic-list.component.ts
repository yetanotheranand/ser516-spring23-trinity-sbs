import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEpecList(this.route.snapshot.paramMap.get('slug'));
  }

  getEpecList(slug) {
    this.epicService.getEpicList(slug).subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
