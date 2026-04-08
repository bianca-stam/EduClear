import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estimations } from './estimations';

describe('Estimations', () => {
  let component: Estimations;
  let fixture: ComponentFixture<Estimations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Estimations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Estimations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
