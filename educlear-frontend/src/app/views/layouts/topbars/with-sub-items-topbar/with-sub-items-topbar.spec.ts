import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithSubItemsTopbar } from './with-sub-items-topbar';

describe('WithSubItemsTopbarComponent', () => {
  let component: WithSubItemsTopbar;
  let fixture: ComponentFixture<WithSubItemsTopbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithSubItemsTopbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithSubItemsTopbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
