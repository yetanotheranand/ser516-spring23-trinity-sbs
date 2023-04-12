import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProjectBaseComponent } from './new-project-base/new-project-base.component';
import { NewProjectRoutingModule } from './new-project.routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewProjectBaseComponent],
  imports: [CommonModule, NewProjectRoutingModule, FormsModule],
})
export class NewProjectModule {}
