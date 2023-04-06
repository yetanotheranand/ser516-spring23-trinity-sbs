import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectDashboardModule } from './../project-dashboard/project-dashboard.module';
import { UserStoryComponent } from './user-story/user-story.component';

@NgModule({
  declarations: [
    AppComponent,
    UserStoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ProjectDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
