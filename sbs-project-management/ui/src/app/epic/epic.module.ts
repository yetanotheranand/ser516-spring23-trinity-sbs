import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpicBaseComponent } from './epic-base/epic-base.component';
import { EpicListComponent } from './epic-list/epic-list.component';
import { NewEpicComponent } from './new-epic/new-epic.component';
import { EpicRoutingModule } from './epic-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EpicEditComponent } from './epic-edit/epic-edit.component';

@NgModule({
  declarations: [
    EpicBaseComponent,
    EpicListComponent,
    NewEpicComponent,
    EpicEditComponent,
  ],
  imports: [CommonModule, EpicRoutingModule, ReactiveFormsModule],
})
export class EpicModule {}
