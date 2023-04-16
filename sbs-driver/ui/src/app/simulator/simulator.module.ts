import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulatorRoutingModule } from './simulator-routing.module';
import { MaterialModule } from '../material/material.module';
import { SimulatorComponent } from './simulator.component';
import { CustomSimulationComponent } from './custom-simulation/custom-simulation.component';
import { TaigaSimulationComponent } from './taiga-simulation/taiga-simulation.component';
import { DiceRollComponent } from './dice-roll/dice-roll.component';

@NgModule({
  declarations: [
    SimulatorComponent,
    CustomSimulationComponent,
    TaigaSimulationComponent,
    DiceRollComponent,
  ],
  imports: [CommonModule, SimulatorRoutingModule, MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SimulatorModule {}
