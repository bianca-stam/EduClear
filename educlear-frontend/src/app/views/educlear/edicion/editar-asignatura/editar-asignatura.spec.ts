import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAsignatura } from './editar-asignatura';

describe('EditarAsignatura', () => {
  let component: EditarAsignatura;
  let fixture: ComponentFixture<EditarAsignatura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAsignatura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAsignatura);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
