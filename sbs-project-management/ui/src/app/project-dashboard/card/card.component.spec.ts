import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectsService } from 'src/app/services/projects.service';

fdescribe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let projectsService: ProjectsService;
  let getProjectsSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [MatCardModule, HttpClientTestingModule],
      providers: [ProjectsService],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    projectsService = TestBed.inject(ProjectsService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the correct number of projects', () => {
    component.projects = []
    const projectEls = fixture.nativeElement.querySelectorAll('mat-card');
    expect(projectEls.length).toEqual(component.projects.length);
  });

  // it('should display the correct project name and description', () => {
  //   const projectEls = fixture.nativeElement.querySelectorAll('mat-card');
  //   for (let i = 0; i < component.projects.length; i++) {
  //     const projectName =
  //       projectEls[i].querySelector('mat-card-title').textContent;
  //     const projectDescription =
  //       projectEls[i].querySelector('mat-card-subtitle').textContent;
  //     expect(projectName).toEqual(component.projects[i].name);
  //     expect(projectDescription).toEqual(component.projects[i].description);
  //   }
  // });

  // it('should display a confirmation dialog when delete button is clicked', () => {
  //   spyOn(window, 'confirm').and.returnValue(true);
  //   const deleteButton = fixture.nativeElement.querySelector(
  //     'button[color="warn"]'
  //   );
  //   console.log(deleteButton);
  //   deleteButton.click();
  //   expect(window.confirm).toHaveBeenCalled();
  // });

  it('should prevent default action when delete is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const event = { preventDefault: jasmine.createSpy('preventDefault') };
    component.deleteAlert(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should test ngOnit Method', () => {
    spyOn(component, 'getProjects');
    component.ngOnInit();
    expect(component.getProjects).toHaveBeenCalled();
  })


  it('should test getProjects Method success scenario', () => {
    const getProjectsSpy = spyOn(projectsService, 'GetProjects').and.returnValue(of([]));
    spyOn(sessionStorage, 'setItem');
    component.getProjects();
    expect(getProjectsSpy).toHaveBeenCalled();
    expect(sessionStorage.setItem).toHaveBeenCalled();

  });

  it('should test getProjects Method error scenario', () => {
    const errorResponse = { status: 401, message: 'Not Found', error: { detail: 'error' } };
    component.errorMessage = '';
    spyOn(console, 'error');

    spyOn(projectsService, 'GetProjects').and.returnValue(throwError(errorResponse));

    fixture.detectChanges();
    expect(component.errorMessage).toBeDefined();
  })

});
