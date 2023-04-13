import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSimulationComponent } from './custom-simulation.component';

describe('CustomSimulationComponent', () => {
  let component: CustomSimulationComponent;
  let fixture: ComponentFixture<CustomSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomSimulationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
