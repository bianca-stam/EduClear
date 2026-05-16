import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { UsuarioDTO } from './auth.service';
import { DbCurso } from '@core/models/db-models';

export interface CursoDTO {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface CursoConAlumnos extends CursoDTO {
  alumnos: number;
  listaAlumnos: UsuarioDTO[];
}

export interface CreateCursoPayload {
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private _http = inject(HttpClient);
  private readonly BASE_URL = `${environment.apiUrl}/cursos`;

  cursoSeleccionado = signal<DbCurso | null>(null);

  // ── Lectura ──────────────────────────────────────────────────────────────

  getCursosDelAlumno(alumnoId: number): Observable<DbCurso[]> {
    return this._http.get<any[]>(`${this.BASE_URL}/alumno/${alumnoId}`).pipe(
      map(cursos => cursos.map(curso => ({
        id_curso: curso.id,
        nombre: curso.nombre,
        descripcion: curso.descripcion || ''
      })))
    );
  }

  getCursosDelProfesor(profesorId: number): Observable<DbCurso[]> {
    return this._http.get<any[]>(`${this.BASE_URL}/profesor/${profesorId}`).pipe(
      map(cursos => cursos.map(curso => ({
        id_curso: curso.id,
        nombre: curso.nombre,
        descripcion: curso.descripcion || ''
      })))
    );
  }

  getAllCursos(): Observable<DbCurso[]> {
    return this._http.get<any[]>(this.BASE_URL).pipe(
      map(cursos => cursos.map(curso => ({
        id_curso: curso.id,
        nombre: curso.nombre,
        descripcion: curso.descripcion || ''
      })))
    );
  }

  getCursoById(id: number): Observable<DbCurso> {
    return this._http.get<any>(`${this.BASE_URL}/${id}`).pipe(
      map(curso => ({
        id_curso: curso.id,
        nombre: curso.nombre,
        descripcion: curso.descripcion || ''
      }))
    );
  }

  // ── Escritura ─────────────────────────────────────────────────────────────

  crearCurso(payload: CreateCursoPayload): Observable<DbCurso> {
    return this._http.post<any>(this.BASE_URL, payload).pipe(
      map(curso => ({
        id_curso: curso.id,
        nombre: curso.nombre,
        descripcion: curso.descripcion || ''
      }))
    );
  }

  editarCurso(id: number, payload: CreateCursoPayload): Observable<DbCurso> {
    return this._http.put<any>(`${this.BASE_URL}/${id}`, payload).pipe(
      map(curso => ({
        id_curso: curso.id,
        nombre: curso.nombre,
        descripcion: curso.descripcion || ''
      }))
    );
  }

  eliminarCurso(id: number): Observable<void> {
    return this._http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
