import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientTopbar } from './gradient-topbar';

describe('GradientTopbar', () => {
  let component: GradientTopbar;
  let fixture: ComponentFixture<GradientTopbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradientTopbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradientTopbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
