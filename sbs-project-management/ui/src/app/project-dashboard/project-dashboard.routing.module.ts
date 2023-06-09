import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { ProjectComponent } from './project/project.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { EpicListComponent } from '../epic/epic-list/epic-list.component';
import { NewEpicComponent } from '../epic/new-epic/new-epic.component';
import { TeamsComponent } from './teams/teams.component';
import { ProductBacklogComponent } from '../product-backlog/product-backlog.component';
import { UserStoryComponent } from '../user-story/user-story.component';
import { DragDropScrumBoardComponent } from '../scrum-board/drag-drop-scrum-board/drag-drop-scrum-board.component';
import { UserStoryDetailsComponent } from '../user-story-details/user-story-details.component';
import { TaskComponent } from '../task/task.component';

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
        path: 'new',
        component: NewProjectComponent,
      },
      {
        path: ':slug',
        children: [
          {
            path: '',
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
          {
            path: 'backlog',
            component: ProductBacklogComponent,
          },
          {
            path: 'team',
            component: TeamsComponent,
          },
          {
            path: 'user-story',
            component: UserStoryComponent,
          },
          {
            path: 'scrum-board',
            component: DragDropScrumBoardComponent,
          },
          {
            path: 'user-story/:usid',
            component: UserStoryDetailsComponent,
          },
          {
            path: 'user-story/:usid/new',
            component: TaskComponent,
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
