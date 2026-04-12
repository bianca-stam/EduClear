import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Wizards } from './wizards';

describe('Wizard', () => {
  let component: Wizards;
  let fixture: ComponentFixture<Wizards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wizards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wizards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
