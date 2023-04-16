import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulatorRoutingModule } from './simulator-routing.module';
import { MaterialModule } from '../material/material.module';
import { SimulatorComponent } from './simulator.component';
import { DiceRollComponent } from './dice-roll/dice-roll.component';

@NgModule({
  declarations: [SimulatorComponent, DiceRollComponent],
  imports: [CommonModule, SimulatorRoutingModule, MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SimulatorModule {}
