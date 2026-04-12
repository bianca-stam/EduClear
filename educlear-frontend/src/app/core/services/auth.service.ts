import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';

export type UserRol = 'ALUMNO' | 'PROFESOR' | 'ADMINISTRADOR';

export interface UsuarioDTO {
  id: number;
  username: string;
  email: string;
  rol: UserRol;
  cursoId: number | null;
}

export interface SesionUsuario {
  id: number;
  email: string;
  username: string;
  rol: UserRol;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http = inject(HttpClient);
  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'current_user';

  readonly usuarioActual = signal<SesionUsuario | null>(null);

  constructor() {
    this.restoreSession();
  }

  login(credentials: { correo: string; password: string }) {
    return this._http.get<UsuarioDTO[]>(`${environment.usuariosUrl}/usuarios`).pipe(
      map(usuarios => {
        const usuario = usuarios.find(u => u.email === credentials.correo);

        if (!usuario) {
          throw new Error('No existe ningún usuario con ese correo.');
        }

        const token = btoa(`${usuario.id}:${usuario.email}:${Date.now()}`);

        const sesion: SesionUsuario = {
          id: usuario.id,
          email: usuario.email,
          username: usuario.username,
          rol: usuario.rol,
          token
        };

        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(sesion));
        this.usuarioActual.set(sesion);

        return sesion;
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.usuarioActual.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private restoreSession() {
    const raw = localStorage.getItem(this.USER_KEY);
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (raw && token) {
      try {
        const sesion: SesionUsuario = JSON.parse(raw);
        this.usuarioActual.set(sesion);
      } catch {
        this.logout();
      }
    }
  }
}
