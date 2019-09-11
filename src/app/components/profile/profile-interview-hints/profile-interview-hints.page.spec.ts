import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInterviewHintsPage } from './profile-interview-hints.page';

describe('ProfileInterviewHintsPage', () => {
  let component: ProfileInterviewHintsPage;
  let fixture: ComponentFixture<ProfileInterviewHintsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInterviewHintsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInterviewHintsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
