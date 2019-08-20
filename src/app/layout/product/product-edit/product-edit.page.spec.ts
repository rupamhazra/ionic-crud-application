import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyEditPage } from './policy-edit.page';

describe('PolicyEditPage', () => {
  let component: PolicyEditPage;
  let fixture: ComponentFixture<PolicyEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
