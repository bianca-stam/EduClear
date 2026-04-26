import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@/environments/environment.development';
import { DbAsignatura, DbTema, DbArchivoContenido, DbExamen, DbTarea } from '../models/db-models';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  private _http = inject(HttpClient);
  private readonly ASIGNATURAS_URL = `${environment.apiUrl}/asignaturas`;
  private readonly MATRICULAS_URL = `${environment.apiUrl}/matriculas`;
  private readonly TEMAS_URL = `${environment.apiUrl}/temas`;
  private readonly ARCHIVOS_URL = `${environment.apiUrl}/materiales/archivos-contenido`;
  private readonly EXAMENES_URL = `${environment.apiUrl}/materiales/examenes`;
  private readonly TAREAS_URL = `${environment.apiUrl}/materiales/tareas`;

  asignaturaSeleccionada = signal<DbAsignatura | null>(null);

  // ✅ Endpoint filtrado en backend: GET /api/asignaturas/curso/{cursoId}
  getAsignaturasByCurso(cursoId: number): Observable<DbAsignatura[]> {
    return this._http.get<any[]>(`${this.ASIGNATURAS_URL}/curso/${cursoId}`).pipe(
      map(data => data.map(a => ({
        id_asignatura: a.id,
        nombre: a.nombre,
        curso_id: a.cursoId,
        profesor_id: a.profesorId
      })))
    );
  }

  // ✅ Endpoint filtrado en backend: GET /api/asignaturas/{id}/alumnos-count
  getAlumnosCount(asignaturaId: number): Observable<number> {
    return this._http.get<number>(`${this.ASIGNATURAS_URL}/${asignaturaId}/alumnos-count`);
  }

  // ✅ Nuevo endpoint: GET /api/asignaturas/curso-ids?profesorId=X
  getCursoIdsByProfesor(profesorId: number): Observable<number[]> {
    return this._http.get<number[]>(`${this.ASIGNATURAS_URL}/curso-ids`, {
      params: { profesorId }
    });
  }

  // ✅ Nuevo endpoint: GET /api/asignaturas/curso-ids/alumno?alumnoId=X
  getCursoIdsByAlumno(alumnoId: number): Observable<number[]> {
    return this._http.get<number[]>(`${this.ASIGNATURAS_URL}/curso-ids/alumno`, {
      params: { alumnoId }
    });
  }

  // Obtener asignaturas del alumno (vía matriculas + asignaturas)
  getAsignaturasDelAlumno(alumnoId: number): Observable<DbAsignatura[]> {
    return forkJoin({
      asignaturas: this._http.get<any[]>(this.ASIGNATURAS_URL),
      matriculas: this._http.get<any[]>(this.MATRICULAS_URL)
    }).pipe(
      map(({ asignaturas, matriculas }) => {
        const alumnoMatriculas = matriculas
          .filter(m => m.alumnoId === alumnoId)
          .map(m => m.asignaturaId);

        return asignaturas
          .filter(a => alumnoMatriculas.includes(a.id))
          .map(a => ({
            id_asignatura: a.id,
            nombre: a.nombre,
            curso_id: a.cursoId,
            profesor_id: a.profesorId
          }));
      })
    );
  }

  // Obtener temas por ID de asignatura (filtrado en frontend - backend no tiene endpoint filtrado)
  getTemasByAsignatura(asignaturaId: number): Observable<DbTema[]> {
    return this._http.get<any[]>(this.TEMAS_URL).pipe(
      map(data => data
        .filter(t => t.asignaturaId === asignaturaId)
        .map(t => ({
          id_tema: t.id,
          titulo: t.titulo,
          descripcion: t.descripcion,
          asignatura_id: t.asignaturaId
        })))
    );
  }
}
