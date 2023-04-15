import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicListComponent } from './epic-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EpicService } from 'src/app/services/epic.service';

fdescribe('EpicListComponent', () => {
  let component: EpicListComponent;
  let fixture: ComponentFixture<EpicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpicListComponent],
      imports: [HttpClientTestingModule],
      providers: [EpicService],
    }).compileComponents();

    fixture = TestBed.createComponent(EpicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.dataSource = [
      {
        epicNo: 1212,
        subject: 'subject',
        description: 'description',
        clientRequirement: true,
        status: 'Assigned',
        assignedTo: 'U801951',
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOniInit', () => {
    spyOn(component, 'getEpecList');
    component.ngOnInit();
    expect(component.getEpecList).toHaveBeenCalled();
  });
});
