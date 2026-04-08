import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientMenu } from './gradient-menu';

describe('GradientMenuComponent', () => {
  let component: GradientMenu;
  let fixture: ComponentFixture<GradientMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradientMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradientMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
