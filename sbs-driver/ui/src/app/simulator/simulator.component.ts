import { Component } from '@angular/core';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css'],
})
export class SimulatorComponent {
  navLinks: any[];
  constructor() {
    this.navLinks = [
      {
        label: 'Simulate taiga projects',
        link: './simulate-taiga',
        index: 0,
      },
      {
        label: 'Simulate custom projects',
        link: './simulate-custom-projects',
        index: 1,
      },
    ];
  }
}
