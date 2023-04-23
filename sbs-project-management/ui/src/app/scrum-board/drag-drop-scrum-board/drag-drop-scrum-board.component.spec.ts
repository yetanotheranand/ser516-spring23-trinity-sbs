import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropScrumBoardComponent } from './drag-drop-scrum-board.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';

fdescribe('DragDropScrumBoardComponent', () => {
  let component: DragDropScrumBoardComponent;
  let fixture: ComponentFixture<DragDropScrumBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropScrumBoardComponent ],
      imports: [RouterTestingModule, DragDropModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get(): string {
                  return '1';
                },
              },
            },
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropScrumBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the status of an item when moved to a container with a different status', () => {
    const component = TestBed.createComponent(DragDropScrumBoardComponent).componentInstance;
    const event = {
      previousContainer: { data: component.inProgress },
      container: { data: component.done },
      previousIndex: 0,
      currentIndex: 0
    };
    component.onDrop(event);
    expect(component.inProgress).toEqual([
      { title: '#US678', description: 'sample description', status:'In Progress'  },
    ]);
    expect(component.done).toEqual([
      { title: '#US753', description: 'sample description', status:'Done' },
      { title: '#US589', description: 'sample description', status:'Done'  },
    ]);
  });

  it('should move items within the same container', () => {
    const component = TestBed.createComponent(DragDropScrumBoardComponent).componentInstance;
    const event = {
      previousContainer: { data: component.ready },
      container: { data: component.ready },
      previousIndex: 0,
      currentIndex: 1
    };
    component.onDrop(event);
    expect(component.ready).toEqual([
      { title: '#US456', description: 'sample description', status:'Ready' },
      { title: '#US516', description: 'sample description', status:'Ready' },
      { title: '#US678', description: 'sample description', status:'Ready'},
    ]);
  });
  
  it('should update the status of an item when moved to a container with a different status', () => {
    const component = TestBed.createComponent(DragDropScrumBoardComponent).componentInstance;
    const event = {
      previousContainer: { data: component.inProgress },
      container: { data: component.done },
      previousIndex: 0,
      currentIndex: 0
    };
    component.onDrop(event);
    expect(component.inProgress).toEqual([
      { title: '#US678', description: 'sample description', status:'In Progress'  },
    ]);
    expect(component.done).toEqual([
      { title: '#US753', description: 'sample description', status:'Done' },
      { title: '#US589', description: 'sample description', status:'Done'  },
    ]);
  });
  
  
});


