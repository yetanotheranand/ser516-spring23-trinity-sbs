import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TeamsComponent, TeamMember } from './teams.component';

fdescribe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamsComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the teamMembers array with the correct number of members', () => {
    expect(component.teamMembers.length).toBe(4);
  });

  it('should display the correct member names', () => {
    const memberNames = fixture.nativeElement.querySelectorAll('.member-name');
    expect(memberNames[0].textContent).toContain('Person1');
    expect(memberNames[1].textContent).toContain('Person2');
    expect(memberNames[2].textContent).toContain('Person3');
    expect(memberNames[3].textContent).toContain('Person4');
  });

  it('should display the "Add New Member" form when the "+New Member" button is clicked', () => {
    const fixture = TestBed.createComponent(TeamsComponent);
    const component = fixture.componentInstance;
    const button =
      fixture.debugElement.nativeElement.querySelector('.add-member-btn');

    expect(component.showAddMemberDialog).toBe(false);

    button.click();
    fixture.detectChanges();

    expect(component.showAddMemberDialog).toBe(true);
    expect(
      fixture.debugElement.nativeElement.querySelector('#add-member-dialog')
    ).toBeTruthy();
  });

  it('should reset the "showAddMemberDialog", "newMemberName" and "newMemberRole" properties when canceling the dialog', () => {
    component.showAddMemberDialog = true;
    component.newMemberName = 'New Person';
    component.newMemberRole = 'Developer';
    component.cancelAddMember();
    expect(component.showAddMemberDialog).toBe(false);
    expect(component.newMemberName).toBe('');
    expect(component.newMemberRole).toBe('');
  });

  it('should not add a new member to the team if fields are blank', () => {
    // Set the fields to blank values
    component.newMemberName = '';
    component.newMemberRole = '';

    // Call the submitNewMember() method
    component.submitNewMember();

    // Expect the teamMembers array to have length of 0
    expect(component.teamMembers.length).toBe(4);
  });

  it('should add a new member to the team', () => {
    // set up test data
    component.newMemberName = 'New Person';
    component.newMemberRole = 'Developer';

    // call the method
    component.submitNewMember();

    // check that the new member was added to the team
    expect(component.teamMembers).toContain({
      name: 'New Person',
      role: 'Developer',
    });

    // reset test data
    component.teamMembers = [];
    component.newMemberName = '';
    component.newMemberRole = '';
  });

  it('should delete a team member', () => {
    // Create a new team member to add
    const newMember: TeamMember = { name: 'Person5', role: 'Tester' };

    // Add the new team member to the list
    component.teamMembers.push(newMember);

    // Mock the window.confirm method to return true
    spyOn(window, 'confirm').and.returnValue(true);

    // Delete the new team member from the list
    component.deleteMember(newMember);

    // Check that the new team member is no longer in the list
    expect(component.teamMembers).not.toContain(newMember);
  });
  it('should clear the newMemberName and newMemberRole properties after adding a new member to the team', () => {
    // set up test data
    component.newMemberName = 'New Person';
    component.newMemberRole = 'Developer';

    // call the method
    component.submitNewMember();

    // check that the new member was added to the team
    expect(component.teamMembers).toContain({
      name: 'New Person',
      role: 'Developer',
    });

    // check that the newMemberName and newMemberRole properties were reset
    expect(component.newMemberName).toBe('');
    expect(component.newMemberRole).toBe('');
  });

  it('should initialize the isEditing and editingMember properties to null', () => {
    expect(component.isEditing).toBe(false);
    expect(component.editingMember).toBe(null);
  });
  it('should set the isEditing and editingMember properties when calling editMember()', () => {
    const member: TeamMember = { name: 'Person1', role: 'Developer' };
    component.editMember(member);

    expect(component.isEditing).toBe(true);
    expect(component.editingMember).toEqual(member);
    expect(component.newMemberRole).toBe(member.role);
  });
  it('should update the role of a team member when calling submitEditedMember()', () => {
    const member: TeamMember = { name: 'Person1', role: 'Developer' };
    const newRole = 'Product Owner';
    component.editMember(member);
    component.newMemberRole = newRole;
    component.submitEditedMember();

    expect(component.isEditing).toBe(false);
    expect(component.editingMember).toBe(null);
    expect(component.newMemberRole).toBe('');
    expect(member.role).toBe(newRole);
  });
  it('should reset the isEditing, editingMember, and newMemberRole properties when calling cancelEditingMember()', () => {
    const member: TeamMember = { name: 'Person1', role: 'Developer' };
    component.editMember(member);
    component.newMemberRole = 'Product Owner';
    component.cancelEditingMember();

    expect(component.isEditing).toBe(false);
    expect(component.editingMember).toBe(null);
    expect(component.newMemberRole).toBe('');
  });
});
