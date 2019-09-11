import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffenderReportPage } from './offender-report.page';

describe('OffenderReportPage', () => {
  let component: OffenderReportPage;
  let fixture: ComponentFixture<OffenderReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffenderReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffenderReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
