import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserStoryComponent } from './user-story/user-story.component';
import { LoginComponent } from './login/login.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProductBacklogComponent } from './product-backlog/product-backlog.component';

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
  { path: 'new-project', component: NewProjectComponent },
  { path: 'user-story', component: UserStoryComponent },
  { path: 'product-backlog', component: ProductBacklogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
