import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrayMenu } from './gray-menu';

describe('GrayMenuComponent', () => {
  let component: GrayMenu;
  let fixture: ComponentFixture<GrayMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrayMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrayMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
