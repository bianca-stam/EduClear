import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicElements } from './basic-elements';


describe('BasicElements', () => {
  let component: BasicElements;
  let fixture: ComponentFixture<BasicElements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicElements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicElements);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
  