import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifyEventPage } from './certify-event.page';

describe('CertifyEventPage', () => {
  let component: CertifyEventPage;
  let fixture: ComponentFixture<CertifyEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifyEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifyEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
