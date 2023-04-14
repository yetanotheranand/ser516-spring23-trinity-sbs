import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { ProjectOperationsComponent } from './project-operations/project-operations.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TitlebarComponent,
      },
      { path: ':slug', component: ProjectOperationsComponent }
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectDashboardRoutingModule {}
