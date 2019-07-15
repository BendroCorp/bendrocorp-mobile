import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAddUpdatePage } from './event-add-update.page';

describe('EventAddUpdatePage', () => {
  let component: EventAddUpdatePage;
  let fixture: ComponentFixture<EventAddUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAddUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAddUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
