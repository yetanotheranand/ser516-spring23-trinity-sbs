/* eslint-disable prettier/prettier */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductBacklogComponent } from './product-backlog.component';
import { HttpClientModule } from '@angular/common/http';
// import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductBacklogService } from '../services/product-backlog.service';
import { By } from '@angular/platform-browser';
// import { Router } from '@angular/router';

fdescribe('ProductBacklogComponent', () => {
  let component: ProductBacklogComponent;
  let fixture: ComponentFixture<ProductBacklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [ProductBacklogComponent],
      providers: [ProductBacklogService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title of the page', () => {
    const titleElement = fixture.debugElement.query(
      By.css('.titlebar h1')
    ).nativeElement;
    expect(titleElement.textContent).toEqual('Product Backlog');
  });

  it('should display all user stories correctly', () => {
    const productBacklogData = [
      { name: 'User Story 1', status: 'New' },
      { name: 'User Story 2', status: 'In progress' },
      { name: 'User Story 3', status: 'Ready to Test' },
    ];

    component.productBacklogData = productBacklogData;
    fixture.detectChanges();

    const userStoryElements =
      fixture.nativeElement.querySelectorAll('.list-group-item');
    expect(userStoryElements.length / 2).toEqual(
      component.productBacklogData.length
    );
  });
});
