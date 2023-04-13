import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaigaSimulationComponent } from './taiga-simulation.component';

describe('TaigaSimulationComponent', () => {
  let component: TaigaSimulationComponent;
  let fixture: ComponentFixture<TaigaSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaigaSimulationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaigaSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
