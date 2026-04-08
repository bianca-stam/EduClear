import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactMenu } from './compact-menu';

describe('CompactMenuComponent', () => {
  let component: CompactMenu;
  let fixture: ComponentFixture<CompactMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompactMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompactMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
