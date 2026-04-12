import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.usuarioActual() !== null || localStorage.getItem('access_token') !== null;

  if (isAuthenticated) {
    return true; 
  }

  // Si no está autenticado, no solo devolvemos false, sino que lo 
  // redirigimos inmediatamente a la pantalla de login usando UrlTree.
  return router.createUrlTree(['/auth-2/sign-in']);
};
