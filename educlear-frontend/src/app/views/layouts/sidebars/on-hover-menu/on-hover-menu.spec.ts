import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnHoverMenu} from './on-hover-menu';

describe('OnHoverMenu', () => {
  let component: OnHoverMenu;
  let fixture: ComponentFixture<OnHoverMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnHoverMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnHoverMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
