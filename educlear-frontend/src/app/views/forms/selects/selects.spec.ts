import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Selects } from './selects';


describe('Selects', () => {
  let component: Selects;
  let fixture: ComponentFixture<Selects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Selects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Selects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
