import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasMenu } from './offcanvas-menu';

describe('OffcanvasMenuComponent', () => {
  let component: OffcanvasMenu;
  let fixture: ComponentFixture<OffcanvasMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffcanvasMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffcanvasMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
