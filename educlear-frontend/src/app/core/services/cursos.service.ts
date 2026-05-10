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

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private _http = inject(HttpClient);
  private readonly BASE_URL = `${environment.apiUrl}/cursos`;

  cursoSeleccionado = signal<DbCurso | null>(null);

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
}

