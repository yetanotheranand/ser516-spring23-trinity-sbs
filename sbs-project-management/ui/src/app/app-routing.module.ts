import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserStoryComponent } from './user-story/user-story.component';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './task/task.component';
import { ProductBacklogComponent } from './product-backlog/product-backlog.component';
import { EpicEditComponent } from './epic/epic-edit/epic-edit.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'projects',
    loadChildren: () =>
      import('../../src/app/project-dashboard/project-dashboard.module').then(
        (m) => m.ProjectDashboardModule
      ),
  },
  {
    path: 'epics',
    loadChildren: () =>
      import('../../src/app/epic/epic.module').then((m) => m.EpicModule),
  },
  {
    path: 'scrum-board',
    loadChildren: () =>
      import('../../src/app/scrum-board/scrum-board.module').then(
        (m) => m.ScrumBoardModule
      ),
  },
  // { path: 'new-project', component: NewProjectComponent },
  { path: 'user-story', component: UserStoryComponent },
  { path: 'product-backlog', component: ProductBacklogComponent },
  // { path: 'task', component: TaskComponent },
  { path: 'projects/:slug/epics/:id/edit', component: EpicEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
