import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css'],
})
export class TitlebarComponent {
  constructor(private router: Router) {}

  navigateToNewProjectPage() {
    this.router.navigate(['/new-project']);
  }
}
