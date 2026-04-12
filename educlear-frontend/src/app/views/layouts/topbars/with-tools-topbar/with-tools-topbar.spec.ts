import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithToolsTopbar } from './with-tools-topbar';

describe('WithToolsTopbarComponent', () => {
  let component: WithToolsTopbar;
  let fixture: ComponentFixture<WithToolsTopbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithToolsTopbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithToolsTopbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
