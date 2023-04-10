import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulatorComponent } from './simulator.component';
import { TaigaSimulationComponent } from './taiga-simulation/taiga-simulation.component';
import { CustomSimulationComponent } from './custom-simulation/custom-simulation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TaigaSimulationComponent
      },
      {
        path: 'simulate-taiga',
        component: TaigaSimulationComponent
      },
      {
        path: 'simulate-custom-projects',
        component: CustomSimulationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimulatorRoutingModule {
  
}
