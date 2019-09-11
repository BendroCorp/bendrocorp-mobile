import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileShipsAddUpdatePage } from './profile-ships-add-update.page';

describe('ProfileShipsAddUpdatePage', () => {
  let component: ProfileShipsAddUpdatePage;
  let fixture: ComponentFixture<ProfileShipsAddUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileShipsAddUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileShipsAddUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
