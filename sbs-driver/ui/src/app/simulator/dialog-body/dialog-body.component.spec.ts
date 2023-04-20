/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogBodyComponent } from './dialog-body.component';

describe('DialogBodyComponent', () => {
  let component: DialogBodyComponent;
  let fixture: ComponentFixture<DialogBodyComponent>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  const userStoryMock = [
    {
      title: 'Test Title',
      description: 'Test Description',
      businessValue: 'Test Business Value',
      storyPoints: 'Test Story Points',
      assignedTo: 'Test Assigned To',
      attachments: 'Test Attachments',
      tags: 'Test Tags',
      tasks: [
        {
          id: 1,
          title: 'Test Task Title',
          description: 'Test Task Description',
          businessValue: 'Test Task Business Value',
          storyPoints: 'Test Task Story Points',
          assignedTo: 'Test Task Assigned To',
          attachments: 'Test Task Attachments',
          tags: 'Test Task Tags',
        },
      ],
    },
  ];

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll']);
    await TestBed.configureTestingModule({
      declarations: [DialogBodyComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MAT_DIALOG_DATA, useValue: userStoryMock },
      ],
    }).compileComponents();
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
