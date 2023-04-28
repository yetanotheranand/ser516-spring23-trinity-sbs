import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulatorRoutingModule } from './simulator-routing.module';
import { MaterialModule } from '../material/material.module';
import { SimulatorComponent } from './simulator.component';
import { CustomSimulationComponent } from './custom-simulation/custom-simulation.component';
import { TaigaSimulationComponent } from './taiga-simulation/taiga-simulation.component';

@NgModule({
  declarations: [
    SimulatorComponent,
    CustomSimulationComponent,
    TaigaSimulationComponent,
  ],
  imports: [CommonModule, SimulatorRoutingModule, MaterialModule],
})
export class SimulatorModule {}
