import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitlebarComponent } from './titlebar.component';
import { CardComponent } from '../card/card.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('TitlebarComponent', () => {
  let component: TitlebarComponent;
  let fixture: ComponentFixture<TitlebarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitlebarComponent, CardComponent],
      imports: [MatCardModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitlebarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the titlebar component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const titleEl = fixture.nativeElement.querySelector('.titlebar h1');
    expect(titleEl.textContent).toContain('My Projects');
  });
  xit('should display the "New Project" button', () => {
    const buttonEl = fixture.nativeElement.querySelector('#new-project-button');
    expect(buttonEl).toBeTruthy();
    expect(buttonEl.textContent).toContain('New Project');
  });

  it('should navigate to the right path when New project button is clicked', () => {
    const spy2 = spyOn(router, 'navigate');
    component.navigateToNewProjectPage();
    expect(spy2).toHaveBeenCalledWith(['/new-project']);
  });
});
