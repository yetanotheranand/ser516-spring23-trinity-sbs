import { Component } from '@angular/core';

interface TeamMember {
  name: string;
  role: string;
}

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  teamMembers: TeamMember[] = [
    { name: 'Person1', role: 'Developer' },
    { name: 'Person2', role: 'Stakeholder' },
    { name: 'Person3', role: 'Product Owner' },
    { name: 'Person4', role: 'Developer' },
  ];

  showAddMemberDialog = false;
  newMemberName = '';
  newMemberRole = '';

  addMember() {
    this.showAddMemberDialog = true;
  }

  submitNewMember() {
    if (this.newMemberName && this.newMemberRole) {
      this.teamMembers.push({
        name: this.newMemberName,
        role: this.newMemberRole,
      });
      this.cancelAddMember();
    }
  }

  cancelAddMember() {
    this.showAddMemberDialog = false;
    this.newMemberName = '';
    this.newMemberRole = '';
  }

  deleteMember(member: TeamMember) {
    if (confirm('Are you sure you want to delete this team member?')) {
      const index = this.teamMembers.indexOf(member);
      if (index !== -1) {
        this.teamMembers.splice(index, 1);
      }
    }
  }
}
