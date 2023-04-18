import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { ProjectDashboardRoutingModule } from './project-dashboard.routing.module';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectComponent } from './project/project.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamsComponent } from './teams/teams.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TitlebarComponent,
    CardComponent,
    ProjectComponent,
    NewProjectComponent,
    TeamsComponent,
  ],
  imports: [
    CommonModule,
    ProjectDashboardRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [TitlebarComponent, MatCardModule, MatButtonModule, MatIconModule],
})
export class ProjectDashboardModule {}
