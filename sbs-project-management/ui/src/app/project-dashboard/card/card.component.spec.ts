import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';

fdescribe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [MatCardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the correct number of projects', () => {
    const projectEls = fixture.nativeElement.querySelectorAll('mat-card');
    expect(projectEls.length).toEqual(component.projects.length);
  });

  it('should display the correct project name and description', () => {
    const projectEls = fixture.nativeElement.querySelectorAll('mat-card');
    for (let i = 0; i < component.projects.length; i++) {
      const projectName =
        projectEls[i].querySelector('mat-card-title').textContent;
      const projectDescription =
        projectEls[i].querySelector('mat-card-subtitle').textContent;
      expect(projectName).toEqual(component.projects[i].name);
      expect(projectDescription).toEqual(component.projects[i].description);
    }
  });

  it('should display a confirmation dialog when delete button is clicked', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteButton = fixture.nativeElement.querySelector(
      'button[color="warn"]'
    );
    deleteButton.click();
    expect(window.confirm).toHaveBeenCalled();
  });

  it('should prevent default action when delete is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const event = { preventDefault: jasmine.createSpy('preventDefault') };
    component.deleteAlert(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
