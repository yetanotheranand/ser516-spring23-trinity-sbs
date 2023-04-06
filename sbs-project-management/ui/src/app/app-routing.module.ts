import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserStoryComponent } from './user-story/user-story.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('../../src/project-dashboard/project-dashboard.module').then(m => m.ProjectDashboardModule) },
  { path: 'new-project', loadChildren: () => import('../../src/new-project/new-project.module').then(m => m.NewProjectModule) },
  {path: 'user-story', component: UserStoryComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
