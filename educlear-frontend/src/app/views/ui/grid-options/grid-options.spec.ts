import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridOptions } from './grid-options';

describe('GridOptions', () => {
  let component: GridOptions;
  let fixture: ComponentFixture<GridOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridOptions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridOptions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
