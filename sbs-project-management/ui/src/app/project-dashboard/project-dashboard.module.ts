import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { ProjectDashboardRoutingModule } from './project-dashboard.routing.module';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectOperationsComponent } from './app/project-dashboard/project-operations/project-operations.component';

@NgModule({
  declarations: [TitlebarComponent, CardComponent, ProjectOperationsComponent],
  imports: [
    CommonModule,
    ProjectDashboardRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [TitlebarComponent, MatCardModule, MatButtonModule, MatIconModule],
})
export class ProjectDashboardModule {}
