import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffenderReportDetailPage } from './offender-report-detail.page';

describe('OffenderReportDetailPage', () => {
  let component: OffenderReportDetailPage;
  let fixture: ComponentFixture<OffenderReportDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffenderReportDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffenderReportDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
