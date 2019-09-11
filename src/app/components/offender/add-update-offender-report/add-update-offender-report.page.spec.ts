import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateOffenderReportPage } from './add-update-offender-report.page';

describe('AddUpdateOffenderReportPage', () => {
  let component: AddUpdateOffenderReportPage;
  let fixture: ComponentFixture<AddUpdateOffenderReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateOffenderReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateOffenderReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
