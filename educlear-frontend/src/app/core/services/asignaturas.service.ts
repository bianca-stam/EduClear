import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_ASIGNATURAS, MOCK_TEMAS, MOCK_ARCHIVOS_CONTENIDO, MOCK_EXAMENES, MOCK_TAREAS, MOCK_MATRICULAS } from '../mocks/db-mock';
import { DbAsignatura, DbTema, DbArchivoContenido, DbExamen, DbTarea } from '../models/db-models';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  asignaturaSeleccionada = signal<DbAsignatura | null>(null);

  // MOCK: Obtener asignaturas por ID de curso
  getAsignaturasByCurso(cursoId: number): Observable<DbAsignatura[]> {
    const asignaturas = MOCK_ASIGNATURAS.filter(a => a.curso_id === cursoId);
    return of(asignaturas).pipe(delay(300));
  }

  // MOCK: Obtener temas por ID de asignatura
  getTemasByAsignatura(asignaturaId: number): Observable<DbTema[]> {
    const temas = MOCK_TEMAS.filter(t => t.asignatura_id === asignaturaId);
    return of(temas).pipe(delay(300));
  }

  // MOCK: Obtener archivos por ID de tema
  getArchivosByTema(temaId: number): Observable<DbArchivoContenido[]> {
    const archivos = MOCK_ARCHIVOS_CONTENIDO.filter(a => a.tema_id === temaId);
    return of(archivos).pipe(delay(300));
  }

  // MOCK: Obtener exámenes por ID de tema
  getExamenesByTema(temaId: number): Observable<DbExamen[]> {
    const examenes = MOCK_EXAMENES.filter(e => e.tema_id === temaId);
    return of(examenes).pipe(delay(300));
  }

  // MOCK: Obtener tareas por ID de tema
  getTareasByTema(temaId: number): Observable<DbTarea[]> {
    const tareas = MOCK_TAREAS.filter(t => t.tema_id === temaId);
    return of(tareas).pipe(delay(300));
  }

  // MOCK: Obtener asignaturas del alumno
  getAsignaturasDelAlumno(alumnoId: number): Observable<DbAsignatura[]> {
    const asignaturas = MOCK_ASIGNATURAS.filter(a => a.curso_id === alumnoId);
    return of(asignaturas).pipe(delay(300));
  }

  // MOCK: Obtener cantidad de alumnos matriculados en una asignatura
  getAlumnosCount(asignaturaId: number): Observable<number> {
    const count = MOCK_MATRICULAS.filter(m => m.asignatura_id === asignaturaId).length;
    return of(count).pipe(delay(300));
  }
}
