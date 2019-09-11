import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileServiceRecordPage } from './profile-service-record.page';

describe('ProfileServiceRecordPage', () => {
  let component: ProfileServiceRecordPage;
  let fixture: ComponentFixture<ProfileServiceRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileServiceRecordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileServiceRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
