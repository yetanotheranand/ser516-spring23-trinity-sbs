import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { ProjectComponent } from './project/project.component';
import { EpicListComponent } from '../epic/epic-list/epic-list.component';
import { NewEpicComponent } from '../epic/new-epic/new-epic.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TitlebarComponent,
      },
      {
        path: ':slug',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ProjectComponent,
          },
          {
            path: 'epics',
            component: EpicListComponent,
          },
          {
            path: 'epics/new',
            component: NewEpicComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectDashboardRoutingModule {}
