import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyListPage } from './policy-list.page';

describe('PolicyListPage', () => {
  let component: PolicyListPage;
  let fixture: ComponentFixture<PolicyListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
