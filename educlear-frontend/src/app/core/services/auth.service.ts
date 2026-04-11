import { environment } from '@/environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

export interface AuthResponse {
  token: string,
  user: { id: number, correo:string, name: string }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http = inject(HttpClient);

  readonly usuarioActual = signal<AuthResponse['user'] | null>(null);

  login(credentials: { correo: string; password: string }) {
    return this._http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.token);
        this.usuarioActual.set(response.user);
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.usuarioActual.set(null);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en autenticación:', error);
    return throwError(() => new Error('Credenciales inválidas o error de red.'));
  }
}
