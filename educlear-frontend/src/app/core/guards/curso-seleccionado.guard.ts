import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CursosService } from '../services/cursos.service';

export const cursoSeleccionadoGuard: CanActivateFn = (route, state) => {
  const cursosService = inject(CursosService);
  const router = inject(Router);

  // Verificamos si el curso está seleccionado
  if (cursosService.cursoSleccionado()) {
    return true;
  } else {
    // Si no tiene valor, lo redirigimos de vuelta a cursos
    router.navigate(['/inicio/cursos']);
    return false;
  }
};
