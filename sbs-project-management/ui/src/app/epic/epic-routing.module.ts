import { RouterModule, Routes } from '@angular/router';
import { EpicListComponent } from './epic-list/epic-list.component';
import { NgModule } from '@angular/core';
import { EpicBaseComponent } from './epic-base/epic-base.component';
import { NewEpicComponent } from './new-epic/new-epic.component';



@NgModule({
  exports: [RouterModule],
})
export class EpicRoutingModule {}
