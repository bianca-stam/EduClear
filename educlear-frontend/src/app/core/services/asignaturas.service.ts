import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@/environments/environment';
import { DbAsignatura, DbCalificacionesAlumno, DbTema } from '../models/db-models';

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

  getAlumnosCount(asignaturaId: number): Observable<number> {
    return this._http.get<number>(`${this.ASIGNATURAS_URL}/${asignaturaId}/alumnos-count`);
  }

  getCursoIdsByProfesor(profesorId: number): Observable<number[]> {
    return this._http.get<number[]>(`${this.ASIGNATURAS_URL}/curso-ids`, {
      params: { profesorId }
    });
  }

  getCursoIdsByAlumno(alumnoId: number): Observable<number[]> {
    return this._http.get<number[]>(`${this.ASIGNATURAS_URL}/curso-ids/alumno`, {
      params: { alumnoId }
    });
  }

  getAlumnosByAsignatura(asignaturaId: number): Observable<number[]> {
    return this._http.get<any[]>(this.MATRICULAS_URL).pipe(
      map(matriculas => matriculas
        .filter(m => m.asignaturaId === asignaturaId)
        .map(m => m.alumnoId)
      )
    );
  }

  /** Usa el endpoint directo del backend: GET /asignaturas/alumno/{alumnoId} */
  getAsignaturasDelAlumno(alumnoId: number): Observable<DbAsignatura[]> {
    return this._http.get<any[]>(`${this.ASIGNATURAS_URL}/alumno/${alumnoId}`).pipe(
      map(data => data.map(a => ({
        id_asignatura: a.id,
        nombre: a.nombre,
        curso_id: a.cursoId,
        profesor_id: a.profesorId
      })))
    );
  }

  /** Usa el endpoint filtrado del backend: GET /temas/asignatura/{asignaturaId} */
  getTemasByAsignatura(asignaturaId: number): Observable<DbTema[]> {
    return this._http.get<any[]>(`${this.TEMAS_URL}/asignatura/${asignaturaId}`).pipe(
      map(data => data.map(t => ({
        id_tema: t.idTema,
        titulo: t.titulo,
        descripcion: t.descripcion,
        asignatura_id: t.asignaturaId
      })))
    );
  }

  getPromedioCalificacionesPorAlumno(alumnoId: number, asignaturaId: number): Observable<any[]> {
    return forkJoin({
      temas: this.getTemasByAsignatura(asignaturaId),
      promedios: this._http.get<any[]>(`${this.TEMAS_URL}/alumno/${alumnoId}/promedios`)
    }).pipe(
      map(({ temas, promedios }) => {
        const temaIds = temas.map(t => t.id_tema);
        return promedios.filter(p => temaIds.includes(p.temaId));
      })
    );
  }

  /** Usa el endpoint directo: GET /temas/alumno/{alumnoId}/asignatura/{asignaturaId}/promedios */
  getPromediosPorAlumnoYAsignatura(alumnoId: number, asignaturaId: number): Observable<DbCalificacionesAlumno[]> {
    return this._http.get<DbCalificacionesAlumno[]>(
      `${this.TEMAS_URL}/alumno/${alumnoId}/asignatura/${asignaturaId}/promedios`
    );
  }

  // ── Escritura (admin/profesor) ─────────────────────────────────────────────

  crearAsignatura(payload: { nombre: string; cursoId: number; profesorId: number }): Observable<DbAsignatura> {
    return this._http.post<any>(this.ASIGNATURAS_URL, payload).pipe(
      map(a => ({
        id_asignatura: a.id,
        nombre: a.nombre,
        curso_id: a.cursoId,
        profesor_id: a.profesorId
      }))
    );
  }

  editarAsignatura(id: number, payload: { nombre: string; profesorId: number }): Observable<DbAsignatura> {
    return this._http.put<any>(`${this.ASIGNATURAS_URL}/${id}`, payload).pipe(
      map(a => ({
        id_asignatura: a.id,
        nombre: a.nombre,
        curso_id: a.cursoId,
        profesor_id: a.profesorId
      }))
    );
  }

  eliminarAsignatura(id: number): Observable<void> {
    return this._http.delete<void>(`${this.ASIGNATURAS_URL}/${id}`);
  }

  getAsignaturaById(id: number): Observable<DbAsignatura> {
    return this._http.get<any>(`${this.ASIGNATURAS_URL}/${id}`).pipe(
      map(a => ({
        id_asignatura: a.id,
        nombre: a.nombre,
        curso_id: a.cursoId,
        profesor_id: a.profesorId
      }))
    );
  }
}
