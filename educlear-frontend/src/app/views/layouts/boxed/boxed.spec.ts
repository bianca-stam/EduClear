import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Boxed } from './boxed';

describe('BoxedComponent', () => {
  let component: Boxed;
  let fixture: ComponentFixture<Boxed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Boxed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Boxed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
