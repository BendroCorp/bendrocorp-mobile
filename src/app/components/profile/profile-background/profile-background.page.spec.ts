import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBackgroundPage } from './profile-background.page';

describe('ProfileBackgroundPage', () => {
  let component: ProfileBackgroundPage;
  let fixture: ComponentFixture<ProfileBackgroundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBackgroundPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBackgroundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
