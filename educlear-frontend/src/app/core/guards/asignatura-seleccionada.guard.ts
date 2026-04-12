import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AsignaturasService } from '../services/asignaturas.service';

export const asignaturaSeleccionadaGuard: CanActivateFn = (route, state) => {
  const asignaturasService = inject(AsignaturasService);
  const router = inject(Router);

  // Verificamos si la asignatura está seleccionada
  if (asignaturasService.asignaturaSeleccionada()) {
    return true;
  } else {
    // Si entran directamente, los mandamos a la lista de cursos para reiniciar el flujo
    router.navigate(['/inicio/cursos']);
    return false;
  }
};
