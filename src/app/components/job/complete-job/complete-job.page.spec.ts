import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteJobPage } from './complete-job.page';

describe('CompleteJobPage', () => {
  let component: CompleteJobPage;
  let fixture: ComponentFixture<CompleteJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteJobPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
