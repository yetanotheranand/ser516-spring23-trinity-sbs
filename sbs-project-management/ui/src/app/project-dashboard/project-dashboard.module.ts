import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { ProjectDashboardRoutingModule } from './project-dashboard.routing.module';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [TitlebarComponent, CardComponent],
  imports: [
    CommonModule,
    ProjectDashboardRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [TitlebarComponent, MatCardModule, MatButtonModule],
})
export class ProjectDashboardModule {}
