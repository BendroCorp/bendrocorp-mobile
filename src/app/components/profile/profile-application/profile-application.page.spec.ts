import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileApplicationPage } from './profile-application.page';

describe('ProfileApplicationPage', () => {
  let component: ProfileApplicationPage;
  let fixture: ComponentFixture<ProfileApplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileApplicationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
