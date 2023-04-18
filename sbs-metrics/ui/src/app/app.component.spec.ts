import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { NgChartsModule } from 'ng2-charts';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, NgChartsModule],
      declarations: [AppComponent, GraphComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ui');
  });

  it('should render content', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const graphComponent = fixture.debugElement.query(
      By.directive(GraphComponent)
    );
    expect(graphComponent).toBeTruthy();
  });
});
