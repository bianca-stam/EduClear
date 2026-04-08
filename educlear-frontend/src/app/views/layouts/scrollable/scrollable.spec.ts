import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scrollable } from './scrollable';

describe('ScrollableComponent', () => {
  let component: Scrollable;
  let fixture: ComponentFixture<Scrollable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scrollable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scrollable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
