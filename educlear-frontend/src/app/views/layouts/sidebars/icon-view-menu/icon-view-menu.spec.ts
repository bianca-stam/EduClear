import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconViewMenu } from './icon-view-menu';

describe('IconViewMenuComponent', () => {
  let component: IconViewMenu;
  let fixture: ComponentFixture<IconViewMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconViewMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconViewMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
