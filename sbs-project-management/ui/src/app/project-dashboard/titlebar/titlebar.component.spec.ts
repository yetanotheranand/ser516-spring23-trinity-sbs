import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitlebarComponent } from './titlebar.component';
import { CardComponent } from '../card/card.component';
import { NewProjectBaseComponent } from 'src/new-project/new-project-base/new-project-base.component';
import { MatCardModule } from '@angular/material/card';

fdescribe('TitlebarComponent', () => {
  let component: TitlebarComponent;
  let fixture: ComponentFixture<TitlebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitlebarComponent, CardComponent, NewProjectBaseComponent ],
      imports:[MatCardModule]
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
  it('should display the "New Project" button', () => {
    const buttonEl = fixture.nativeElement.querySelector('.titlebar button');
    expect(buttonEl).toBeTruthy();
    expect(buttonEl.textContent).toContain('New Project');
  });

});
