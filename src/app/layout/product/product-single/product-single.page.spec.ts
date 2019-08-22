import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSinglePage } from './product-single.page';

describe('ProductSinglePage', () => {
  let component: ProductSinglePage;
  let fixture: ComponentFixture<ProductSinglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSinglePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSinglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
