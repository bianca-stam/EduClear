import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tema } from './tema';

describe('Tema', () => {
  let component: Tema;
  let fixture: ComponentFixture<Tema>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tema]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tema);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
