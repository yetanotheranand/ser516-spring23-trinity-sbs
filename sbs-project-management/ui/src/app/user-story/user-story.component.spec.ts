import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserStoryComponent } from './user-story.component';
import { FormsModule } from '@angular/forms';

fdescribe('UserStoryComponent', () => {
  let component: UserStoryComponent;
  let fixture: ComponentFixture<UserStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserStoryComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
