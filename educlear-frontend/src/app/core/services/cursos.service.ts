import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { delay, forkJoin, map, Observable, of } from 'rxjs';
import { UsuarioDTO } from './auth.service';
import { MOCK_CURSOS } from '@core/mocks/db-mock';
import { MOCK_ASIGNATURAS } from '@core/mocks/db-mock';
import { MOCK_MATRICULAS } from '@core/mocks/db-mock';
import { DbCurso } from '@core/models/db-models';

export interface CursoDTO {
  id: number;
  nombre: string;
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
  private readonly BASE_URL = `${environment.cursosUrl}/cursos`;

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
      usuarios: this._http.get<UsuarioDTO[]>(`${environment.usuariosUrl}/usuarios`)
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
    // 1. Obtenemos los IDs de las asignaturas donde está matriculado el alumno
    const idsAsignaturasMatriculadas = MOCK_MATRICULAS
      .filter(m => m.alumno_id === alumnoId)
      .map(m => m.asignatura_id);

    // 2. Obtenemos los IDs de los cursos a los que pertenecen esas asignaturas
    const idsCursosDelAlumno = MOCK_ASIGNATURAS
      .filter(asig => idsAsignaturasMatriculadas.includes(asig.id_asignatura))
      .map(asig => asig.curso_id);

    // 3. Filtramos la lista maestra de cursos
    // Usamos un Set para eliminar duplicados de IDs de cursos si el alumno tiene varias asignaturas en el mismo curso
    const idsUnicos = [...new Set(idsCursosDelAlumno)];
    const cursosFiltrados = MOCK_CURSOS.filter(curso => idsUnicos.includes(curso.id_curso));

    return of(cursosFiltrados).pipe(delay(500));
  }

}

