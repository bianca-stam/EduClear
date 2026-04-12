import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrayTopbar } from './gray-topbar';

describe('GrayTopbarComponent', () => {
  let component: GrayTopbar;
  let fixture: ComponentFixture<GrayTopbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrayTopbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrayTopbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
