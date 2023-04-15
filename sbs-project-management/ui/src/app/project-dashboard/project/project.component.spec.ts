import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  const mockActivatedRoute = {
    snapshot: { paramMap: { get: () => '1' } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectComponent],
      imports: [MatIconModule],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the project name and description', () => {
    // Set up test data
    const mockProject = {
      id: '1',
      name: 'Test Project',
      description: 'This is a test project',
    };
    const mockProjects = [mockProject];
    sessionStorage.setItem('Projects', JSON.stringify(mockProjects));

    // Trigger ngOnInit
    fixture.detectChanges();

    // Check that the project name and description are displayed
    const header = fixture.nativeElement.querySelector('#header');
    expect(header.innerText.trim()).toBe(mockProject.name);
    const desc = fixture.nativeElement.querySelector('#desc');
    expect(desc.innerText.trim()).toBe(mockProject.description);
  });

  it('should trigger the Teams button click event', () => {
    // Create a spy for the onTeamsClick method
    const onTeamsClickSpy = spyOn(component, 'onTeamsClick');

    // Get the Teams button element
    const button = fixture.nativeElement.querySelector('.teams-button');

    // Trigger the click event on the Teams button element
    button.click();

    // Check that the onTeamsClick method was called
    expect(onTeamsClickSpy).toHaveBeenCalled();
  });

  it('should display the Teams button with the "people" icon', () => {
    // Trigger ngOnInit
    fixture.detectChanges();

    // Check that the Teams button contains the mat-icon with the "people" icon
    const icon = fixture.nativeElement.querySelector('.teams-button mat-icon');
    expect(icon.textContent.trim()).toBe('people');
  });
});
