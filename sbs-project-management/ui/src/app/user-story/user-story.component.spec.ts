import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserStoryComponent } from './user-story.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('UserStoryComponent', () => {
  let component: UserStoryComponent;
  let fixture: ComponentFixture<UserStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserStoryComponent],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should log userStoryData to console', () => {
    spyOn(console, 'log');
    component.userStoryData.name = 'Test User Story';
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith(component.userStoryData);
  });
});
