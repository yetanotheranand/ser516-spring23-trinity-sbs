import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { ProjectDashboardRoutingModule } from './project-dashboard.routing.module';



@NgModule({
  declarations: [
    TitlebarComponent
  ],
  imports: [
    CommonModule,
    ProjectDashboardRoutingModule
  ],
  exports: [
    TitlebarComponent,
  ]
})
export class ProjectDashboardModule { }
