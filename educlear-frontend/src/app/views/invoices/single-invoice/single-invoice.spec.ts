import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInvoice } from './single-invoice';

describe('SingleInvoice', () => {
  let component: SingleInvoice;
  let fixture: ComponentFixture<SingleInvoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleInvoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleInvoice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
