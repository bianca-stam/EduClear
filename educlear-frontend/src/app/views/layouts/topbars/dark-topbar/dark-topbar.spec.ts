import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkTopbar } from './dark-topbar';

describe('DarkTopbarComponent', () => {
  let component: DarkTopbar;
  let fixture: ComponentFixture<DarkTopbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkTopbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkTopbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
