/* eslint-disable prettier/prettier */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorRoutingModule } from './simulator-routing.module';
import { MaterialModule } from '../material/material.module';
import { SimulatorComponent } from './simulator.component';
import { DiceRollComponent } from './dice-roll/dice-roll.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SimulatorComponent, 
    DiceRollComponent, 
    DialogBodyComponent
  ],
  imports: [CommonModule, SimulatorRoutingModule, MaterialModule, MatIconModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SimulatorModule {}
