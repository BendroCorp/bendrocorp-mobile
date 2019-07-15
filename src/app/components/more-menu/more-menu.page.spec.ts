import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreMenuPage } from './more-menu.page';

describe('MoreMenuPage', () => {
  let component: MoreMenuPage;
  let fixture: ComponentFixture<MoreMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
