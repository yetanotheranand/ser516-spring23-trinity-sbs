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

  it('should display the correct member names', () => {
    const memberNames = fixture.nativeElement.querySelectorAll('.member-name');
    expect(memberNames[0].textContent).toContain('Person1');
    expect(memberNames[1].textContent).toContain('Person2');
    expect(memberNames[2].textContent).toContain('Person3');
    expect(memberNames[3].textContent).toContain('Person4');
  });

  it('should position the "+New Member" button in the top right corner of the page', () => {
    const button = fixture.nativeElement.querySelector('.add-member-btn');
    const buttonRect = button.getBoundingClientRect();
    const pageWidth = window.innerWidth || document.documentElement.clientWidth;
    expect(buttonRect.left).toBeCloseTo(pageWidth - buttonRect.width - 20, -1);
    expect(buttonRect.top).toBeCloseTo(20, -1);
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
});
