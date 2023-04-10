import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { SimulatorModule } from './simulator/simulator.module';
import { SimulatorComponent } from './simulator/simulator.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
  },
  {
    path: 'simulator',
    component: SimulatorComponent,
    loadChildren: () =>
      import('./simulator/simulator.module').then((m) => m.SimulatorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
