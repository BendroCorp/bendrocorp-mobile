import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightLogPage } from './flight-log.page';

describe('FlightLogPage', () => {
  let component: FlightLogPage;
  let fixture: ComponentFixture<FlightLogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightLogPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
