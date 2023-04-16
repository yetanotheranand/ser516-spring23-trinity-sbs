import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [CommonModule, MatTabsModule, MatCardModule,MatStepperModule, MatDialogModule, MatButtonModule],
  exports: [MatTabsModule, MatCardModule, MatStepperModule, MatDialogModule, MatButtonModule],
})
export class MaterialModule {}
