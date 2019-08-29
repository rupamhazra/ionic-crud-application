import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingleZoomPage } from './product-single-zoom.page';

describe('ProductSingleZoomPage', () => {
  let component: ProductSingleZoomPage;
  let fixture: ComponentFixture<ProductSingleZoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSingleZoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSingleZoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
