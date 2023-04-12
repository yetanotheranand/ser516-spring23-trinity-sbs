import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProjectBaseComponent } from './new-project-base/new-project-base.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //    path: '',
      //    pathMatch: 'full',
      //    component: NewProjectBaseComponent
      // },
      {
        path: '',
        component: NewProjectBaseComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewProjectRoutingModule {}
