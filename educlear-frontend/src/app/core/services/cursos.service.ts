import { environment } from '@/environments/environment.development';
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

  getAllCursos(): Observable<CursoDTO[]> {
    return this._http.get<CursoDTO[]>(this.BASE_URL);
  }

  getCursoById(id: number): Observable<CursoDTO> {
    return this._http.get<CursoDTO>(`${this.BASE_URL}/${id}`);
  }

  getCursosConAlumnos(): Observable<CursoConAlumnos[]> {
    return forkJoin({
      cursos: this._http.get<CursoDTO[]>(this.BASE_URL),
      usuarios: this._http.get<UsuarioDTO[]>(`${environment.apiUrl}/usuarios`)
    }).pipe(
      map(({ cursos, usuarios }) => {
        const alumnos = usuarios.filter(u => u.rol === 'alumno');
        return cursos.map(curso => ({
          ...curso,
          alumnos: alumnos.filter(u => u.cursoId === curso.id).length,
          listaAlumnos: alumnos.filter(u => u.cursoId === curso.id)
        }));
      })
    );
  }

  getCursosDelAlumno(alumnoId: number): Observable<DbCurso[]> {
    return forkJoin({
      matriculas: this._http.get<any[]>(`${environment.apiUrl}/matriculas`),
      asignaturas: this._http.get<any[]>(`${environment.apiUrl}/asignaturas`),
      cursos: this._http.get<CursoDTO[]>(this.BASE_URL)
    }).pipe(
      map(({ matriculas, asignaturas, cursos }) => {
        // 1. Obtenemos los IDs de las asignaturas donde está matriculado el alumno
        const idsAsignaturasMatriculadas = matriculas
          .filter(m => m.alumnoId === alumnoId)
          .map(m => m.asignaturaId);

        // 2. Obtenemos los IDs de los cursos a los que pertenecen esas asignaturas
        const idsCursosDelAlumno = asignaturas
          .filter(asig => idsAsignaturasMatriculadas.includes(asig.id))
          .map(asig => asig.cursoId);

        // 3. Filtramos la lista maestra de cursos
        const idsUnicos = [...new Set(idsCursosDelAlumno)];
        return cursos
          .filter(curso => idsUnicos.includes(curso.id))
          .map(curso => ({
            id_curso: curso.id,
            nombre: curso.nombre,
            descripcion: curso.descripcion || ''
          }));
      })
    );
  }
}

