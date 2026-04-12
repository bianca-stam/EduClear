import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPw } from './new-pw';

describe('NewPw', () => {
  let component: NewPw;
  let fixture: ComponentFixture<NewPw>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPw]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPw);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
