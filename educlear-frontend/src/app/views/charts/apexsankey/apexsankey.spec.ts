import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Apexsankey } from './apexsankey';


describe('Apexsankey', () => {
  let component: Apexsankey;
  let fixture: ComponentFixture<Apexsankey>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Apexsankey]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Apexsankey);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
