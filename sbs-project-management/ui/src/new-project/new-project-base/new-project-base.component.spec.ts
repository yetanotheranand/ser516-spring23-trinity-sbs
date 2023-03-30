import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectBaseComponent } from './new-project-base.component';

describe('NewProjectBaseComponent', () => {
  let component: NewProjectBaseComponent;
  let fixture: ComponentFixture<NewProjectBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProjectBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProjectBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
