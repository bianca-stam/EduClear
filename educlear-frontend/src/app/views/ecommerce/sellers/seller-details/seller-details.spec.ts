import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDetails } from './seller-details';

describe('SellerDetailsComponent', () => {
  let component: SellerDetails;
  let fixture: ComponentFixture<SellerDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
