import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');

  // if (token) {
  //   const authReq = req.clone({
  //     headers: req.headers.set('Authorization', `Bearer ${token}`)
  //   });
  //   return next(authReq);
  // }

  if (req.url.endsWith('/auth/login') && req.method === 'POST') {
    const body = req.body as any;
    console.log(body);
    
    return of(null).pipe(
      delay(1500),
      switchMap(() => {
        if (body.correo === 'admin@educlear.com' && body.password === '123456') {
          
          return of(new HttpResponse({
            status: 200,
            body: {
              token: 'mock-jwt-token-7382947239',
              user: { id: 1, email: 'admin@educlear.com', name: 'Kevin Front' }
            }
          }));
          
        } else {
          return throwError(() => new HttpErrorResponse({
            status: 401,
            statusText: 'Unauthorized',
            error: { message: 'Credenciales incorrectas' }
          }));
        }
      })
    );
  }

  return next(req);
};
