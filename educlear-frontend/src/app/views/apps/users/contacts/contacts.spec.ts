import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contacts } from './contacts';

describe('ContactsComponent', () => {
  let component: Contacts;
  let fixture: ComponentFixture<Contacts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contacts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contacts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
