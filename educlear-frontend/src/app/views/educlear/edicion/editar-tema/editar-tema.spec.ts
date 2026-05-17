import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTema } from './editar-tema';

describe('EditarTema', () => {
  let component: EditarTema;
  let fixture: ComponentFixture<EditarTema>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTema]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTema);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
