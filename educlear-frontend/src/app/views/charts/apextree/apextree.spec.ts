import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Apextree } from './apextree';

describe('Apextree', () => {
  let component: Apextree;
  let fixture: ComponentFixture<Apextree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Apextree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Apextree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
