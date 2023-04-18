/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatStepperModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  exports: [
    MatTabsModule,
    MatCardModule,
    MatStepperModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class MaterialModule {}
