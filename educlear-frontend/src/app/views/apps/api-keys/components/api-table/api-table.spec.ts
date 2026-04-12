import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTable } from './api-table';

describe('ApiTable', () => {
  let component: ApiTable;
  let fixture: ComponentFixture<ApiTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
