import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroups } from './list-groups';

describe('ListGroups', () => {
  let component: ListGroups;
  let fixture: ComponentFixture<ListGroups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGroups]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGroups);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
