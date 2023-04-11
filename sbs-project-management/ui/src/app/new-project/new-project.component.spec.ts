import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms'; // import FormsModule
import { ActivatedRoute, Router } from '@angular/router';

import { NewProjectComponent } from './new-project.component';

fdescribe('NewProjectBaseComponent', () => {
  let component: NewProjectComponent;
  let fixture: ComponentFixture<NewProjectComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewProjectComponent],
      imports: [RouterTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NewProjectComponent);
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
    expect(navigateSpy).toHaveBeenCalledWith(['../projects'], {
      relativeTo: route,
    });
  });
});
