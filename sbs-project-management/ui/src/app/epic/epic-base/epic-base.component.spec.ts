import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicBaseComponent } from './epic-base.component';

describe('EpicBaseComponent', () => {
  let component: EpicBaseComponent;
  let fixture: ComponentFixture<EpicBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpicBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EpicBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create EpicBaseComponent', () => {
    expect(component).toBeTruthy();
  });
});
