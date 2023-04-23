import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropScrumBoardComponent } from './drag-drop-scrum-board/drag-drop-scrum-board.component';
import { ScrumBoardRoutingModule } from './scrum-board.routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [DragDropScrumBoardComponent],
  imports: [CommonModule, DragDropModule, ScrumBoardRoutingModule],
})
export class ScrumBoardModule {}
