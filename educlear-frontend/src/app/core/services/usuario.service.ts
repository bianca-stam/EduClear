import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioDTO } from './auth.service';

export interface CrearUsuarioPayload {
  username: string;
  password: string;
  email: string;
  rol: 'ALUMNO' | 'PROFESOR' | 'ADMINISTRADOR';
  cursoId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _http = inject(HttpClient);
  private readonly BASE_URL = `${environment.apiUrl}/usuarios`;

  getAllUsers(): Observable<UsuarioDTO[]> {
    return this._http.get<UsuarioDTO[]>(this.BASE_URL);
  }

  getUserById(id: number): Observable<UsuarioDTO> {
    return this._http.get<UsuarioDTO>(`${this.BASE_URL}/${id}`);
  }

  getProfesores(): Observable<UsuarioDTO[]> {
    return this.getAllUsers().pipe(
      map(users => users.filter(u => u.rol?.toLowerCase() === 'profesor'))
    );
  }

  createUser(usuario: CrearUsuarioPayload): Observable<UsuarioDTO> {
    return this._http.post<UsuarioDTO>(this.BASE_URL, usuario);
  }

  deleteUser(id: number): Observable<void> {
    return this._http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
