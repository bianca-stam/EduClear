import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightMenu } from './light-menu';

describe('LightMenuComponent', () => {
  let component: LightMenu;
  let fixture: ComponentFixture<LightMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
