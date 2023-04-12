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
@NgModule({
  declarations: [AppComponent, LoginComponent, UserStoryComponent],
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
  ],
  exports: [FlexLayoutModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
