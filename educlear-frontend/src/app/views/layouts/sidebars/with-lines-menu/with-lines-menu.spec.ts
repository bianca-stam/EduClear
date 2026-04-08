import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithLinesMenu } from './with-lines-menu';

describe('WithLinesMenuComponent', () => {
  let component: WithLinesMenu;
  let fixture: ComponentFixture<WithLinesMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithLinesMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithLinesMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
