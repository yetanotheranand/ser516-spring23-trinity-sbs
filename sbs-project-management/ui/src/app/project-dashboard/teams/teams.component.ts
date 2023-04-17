import { Component } from '@angular/core';

interface TeamMember {
  name: string;
  role: string;
}

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  teamMembers: TeamMember[] = [
    { name: 'Person1', role: 'Select' },
    { name: 'Person2', role: 'Select' },
    { name: 'Person3', role: 'Select' },
    { name: 'Person4', role: 'Select' },
  ];
}
