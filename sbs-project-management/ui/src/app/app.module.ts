import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserStoryComponent } from './user-story/user-story.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectDashboardModule } from '../app/project-dashboard/project-dashboard.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../app/services/interceptor';
import { ProductBacklogComponent } from './product-backlog/product-backlog.component';
import { TaskComponent } from './task/task.component';
import { CommonModule } from '@angular/common';
import { UserStoryDetailsComponent } from './user-story-details/user-story-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserStoryComponent,
    UserStoryDetailsComponent,
    ProductBacklogComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ProjectDashboardModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [FlexLayoutModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
