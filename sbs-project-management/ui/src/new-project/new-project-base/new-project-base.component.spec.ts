import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms'; // import FormsModule
import { ActivatedRoute, Router } from '@angular/router';

import { NewProjectBaseComponent } from './new-project-base.component';

describe('NewProjectBaseComponent', () => {
  let component: NewProjectBaseComponent;
  let fixture: ComponentFixture<NewProjectBaseComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewProjectBaseComponent],
      imports: [RouterTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NewProjectBaseComponent);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit method', () => {
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.projectName).toBeDefined();
    expect(component.projectDescription).toBeDefined();
  });

  it('should navigate back', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.navigateBack();
    expect(navigateSpy).toHaveBeenCalledWith(['../'], { relativeTo: route });
  });
});
