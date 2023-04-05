import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitlebarComponent } from './titlebar.component';

fdescribe('TitlebarComponent', () => {
  let component: TitlebarComponent;
  let fixture: ComponentFixture<TitlebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitlebarComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the titlebar component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const titleEl = fixture.nativeElement.querySelector('.titlebar h1');
    expect(titleEl.textContent).toContain('My Projects');
  });

  it('should display the correct number of projects', () => {
    const projectEls = fixture.nativeElement.querySelectorAll('.project');
    expect(projectEls.length).toEqual(component.projects.length);
  });

  it('should display the correct project name and description', () => {
    const projectEls = fixture.nativeElement.querySelectorAll('.project');
    for (let i = 0; i < component.projects.length; i++) {
      const projectName = projectEls[i].querySelector('a').textContent;
      const projectDescription = projectEls[i].querySelector('div').textContent;
      expect(projectName).toEqual(component.projects[i].name);
      expect(projectDescription).toEqual(component.projects[i].description);
    }
  });

  it('should display the "New Project" button', () => {
    const buttonEl = fixture.nativeElement.querySelector('.titlebar button');
    expect(buttonEl).toBeTruthy();
    expect(buttonEl.textContent).toContain('New Project');
  });

});
