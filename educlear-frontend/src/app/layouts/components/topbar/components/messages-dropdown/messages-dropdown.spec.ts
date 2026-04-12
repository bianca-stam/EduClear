import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesDropdown } from './messages-dropdown';

describe('MessagesDropdown', () => {
  let component: MessagesDropdown;
  let fixture: ComponentFixture<MessagesDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
