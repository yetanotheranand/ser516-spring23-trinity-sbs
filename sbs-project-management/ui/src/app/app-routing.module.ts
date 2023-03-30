import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('../../src/project-dashboard/project-dashboard.module').then(m => m.ProjectDashboardModule) },
  { path: 'new-project', loadChildren: () => import('../../src/new-project/new-project.module').then(m => m.NewProjectModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
