import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserStoryComponent } from './user-story/user-story.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project-dashboard/project/project.component';
import { NewProjectComponent } from './new-project/new-project.component';
// import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'projects',
    loadChildren: () =>
      import('../../src/app/project-dashboard/project-dashboard.module').then(
        (m) => m.ProjectDashboardModule
      ),
  },
  { path: 'new-project', component: NewProjectComponent },
  { path: 'user-story', component: UserStoryComponent },
  { path: 'projects/:id', component: ProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
