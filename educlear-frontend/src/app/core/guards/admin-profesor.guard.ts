import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const adminProfesorGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const rol = auth.usuarioActual()?.rol;

  if (rol === 'admin' || rol === 'profesor') {
    return true;
  }

  router.navigate(['/cursos']);
  return false;
};
