import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoIconsWithLinesMenu } from './no-icons-with-lines-menu';

describe('NoIconsWithLinesMenuComponent', () => {
  let component: NoIconsWithLinesMenu;
  let fixture: ComponentFixture<NoIconsWithLinesMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoIconsWithLinesMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoIconsWithLinesMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
