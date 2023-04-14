import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TitlebarComponent,
      },
      { path: ':slug', component: ProjectComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectDashboardRoutingModule {}
