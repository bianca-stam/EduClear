import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordMeter } from './password-meter';

describe('PasswordMeter', () => {
  let component: PasswordMeter;
  let fixture: ComponentFixture<PasswordMeter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordMeter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordMeter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
