import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAddPage } from './policy-add.page';

describe('PolicyAddPage', () => {
  let component: PolicyAddPage;
  let fixture: ComponentFixture<PolicyAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
