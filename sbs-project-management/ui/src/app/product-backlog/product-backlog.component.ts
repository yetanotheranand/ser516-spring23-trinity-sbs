import { Component } from '@angular/core';
import { ProductBacklogService } from '../services/product-backlog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.css'],
})
export class ProductBacklogComponent {
  // Replace list of user story data obtained from Taiga API in productBacklogData.
  productBacklogData = [];
  id: any;
  constructor(
    private backlogService: ProductBacklogService,
    private route: ActivatedRoute
  ) {
    // this.getUserStories();
    this.route.queryParamMap.subscribe((params) => {
      this.id = params.get('projectid');
      console.log(this.id);
      if (this.id != null) {
        this.getUserStories();
      }
    });
  }
  getUserStories() {
    this.backlogService.listprojects(this.id).subscribe(
      (data) => {
        console.log(data);
        console.log(this.id);
        this.productBacklogData = data;
        console.log(this.productBacklogData);
        // this.router.navigateByUrl('/projects');
      },
      (error) => {
        if (error.status === 401) {
          console.log(error);
        }
        this.productBacklogData = undefined;
      }
    );
  }
  delete(id) {
    this.backlogService.deleteUserStory(this.id).subscribe(
      (data) => {
        this.getUserStories();
      },
      (error) => {
        if (error.status === 401) {
          console.log(error);
        }
      }
    );
  }
}
