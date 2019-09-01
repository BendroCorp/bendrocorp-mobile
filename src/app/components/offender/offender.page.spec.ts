import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffenderPage } from './offender.page';

describe('OffenderPage', () => {
  let component: OffenderPage;
  let fixture: ComponentFixture<OffenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffenderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
