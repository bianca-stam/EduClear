import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Horizontal } from './horizontal';

describe('HorizontalComponent', () => {
  let component: Horizontal;
  let fixture: ComponentFixture<Horizontal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Horizontal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Horizontal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
