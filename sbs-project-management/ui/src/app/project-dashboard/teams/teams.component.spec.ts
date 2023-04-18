import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TeamsComponent } from './teams.component';

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

  it('should initialize the role of each member to "Select"', () => {
    component.teamMembers.forEach((member) => {
      expect(member.role).toBe('Select');
    });
  });

  it('should display the correct member names', () => {
    const memberNames = fixture.nativeElement.querySelectorAll('.member-name');
    expect(memberNames[0].textContent).toContain('Person1');
    expect(memberNames[1].textContent).toContain('Person2');
    expect(memberNames[2].textContent).toContain('Person3');
    expect(memberNames[3].textContent).toContain('Person4');
  });

  it('should update the role of a member when a new role is selected', () => {
    const selectElements = fixture.nativeElement.querySelectorAll('select');
    selectElements[0].value = 'developer';
    selectElements[0].dispatchEvent(new Event('change'));
    expect(component.teamMembers[0].role).toBe('developer');
  });

  it('should enable the "Select" option when a member\'s role is changed back to "Select"', () => {
    const selectElements = fixture.nativeElement.querySelectorAll('select');
    selectElements[0].value = 'developer';
    selectElements[0].dispatchEvent(new Event('change'));
    selectElements[0].value = 'select';
    selectElements[0].dispatchEvent(new Event('change'));
    expect(selectElements[0].options[0].disabled).toBe(false);
  });
});
