import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtherPlugins } from './other-plugins';



describe('OtherPlugins', () => {
  let component: OtherPlugins;
  let fixture: ComponentFixture<OtherPlugins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherPlugins]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherPlugins);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
