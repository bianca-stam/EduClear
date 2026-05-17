import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DbArchivoContenido, DbAsignatura, DbExamen, DbTarea, DbTema } from '@core/models/db-models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  private readonly ARCHIVOS_URL = `${environment.apiUrl}/materiales/archivos-contenido`;
  private readonly EXAMENES_URL = `${environment.apiUrl}/materiales/examenes`;
  private readonly TAREAS_URL = `${environment.apiUrl}/materiales/tareas`;

  private _http = inject(HttpClient);

  temaSeleccionado = signal<DbTema | null>(null);
  tareaSeleccionada = signal<DbTarea | null>(null);
  examenSeleccionado = signal<DbExamen | null>(null);

    /** Usa el endpoint filtrado del backend: GET /archivos-contenido/tema/{temaId} */
  getArchivosByTema(temaId: number): Observable<DbArchivoContenido[]> {
    return this._http.get<any[]>(`${this.ARCHIVOS_URL}/tema/${temaId}`).pipe(
      map(data => data.map(a => ({
        id_contenido: a.id,
        tema_id: a.temaId,
        nombre_archivo: a.nombreArchivo,
        tipo_mime: a.tipoMime,
        peso_bytes: a.pesoBytes,
        archivo_blob: a.archivoBlob
      })))
    );
  }

  // Obtener el objeto completo del archivo (incluyendo el blob en base64)
  getArchivoById(archivoId: number): Observable<any> {
    return this._http.get(`${this.ARCHIVOS_URL}/${archivoId}`);
  }

  subirArchivo(payload: { temaId: number, nombreArchivo: string, tipoMime: string, pesoBytes: number, archivoBlob: string }): Observable<any> {
    return this._http.post<any>(this.ARCHIVOS_URL, payload);
  }

  eliminarArchivo(id: number): Observable<void> {
    return this._http.delete<void>(`${this.ARCHIVOS_URL}/${id}`);
  }

  /** Usa el endpoint filtrado del backend: GET /examenes/tema/{temaId} */
  getExamenesByTema(temaId: number): Observable<DbExamen[]> {
    return this._http.get<any[]>(`${this.EXAMENES_URL}/tema/${temaId}`).pipe(
      map(data => data.map(e => ({
        id_examen: e.id,
        tema_id: e.temaId,
        titulo: e.titulo,
        descripcion: e.descripcion,
        fecha_apertura: e.fechaApertura,
        fecha_cierre: e.fechaCierre
      })))
    );
  }

  /** Usa el endpoint filtrado del backend: GET /tareas/tema/{temaId} */
  getTareasByTema(temaId: number): Observable<DbTarea[]> {
    return this._http.get<any[]>(`${this.TAREAS_URL}/tema/${temaId}`).pipe(
      map(data => data.map(t => ({
        id_tarea: t.id,
        tema_id: t.temaId,
        titulo: t.titulo,
        descripcion: t.descripcion,
        fecha_apertura: t.fechaApertura,
        fecha_cierre: t.fechaCierre
      })))
    );
  }

  // ── CRUD de Tareas ────────────────────────────────────────────────────────

  getTareaById(id: number): Observable<DbTarea> {
    return this._http.get<any>(`${this.TAREAS_URL}/${id}`).pipe(
      map(t => ({
        id_tarea: t.id,
        tema_id: t.temaId,
        titulo: t.titulo,
        descripcion: t.descripcion,
        fecha_apertura: t.fechaApertura,
        fecha_cierre: t.fechaCierre
      }))
    );
  }

  crearTarea(payload: { titulo: string; descripcion: string; temaId: number; fechaApertura: string; fechaCierre: string }): Observable<DbTarea> {
    return this._http.post<any>(this.TAREAS_URL, payload).pipe(
      map(t => ({
        id_tarea: t.id,
        tema_id: t.temaId,
        titulo: t.titulo,
        descripcion: t.descripcion,
        fecha_apertura: t.fechaApertura,
        fecha_cierre: t.fechaCierre
      }))
    );
  }

  editarTarea(id: number, payload: { titulo: string; descripcion: string; fechaApertura: string; fechaCierre: string }): Observable<DbTarea> {
    return this._http.patch<any>(`${this.TAREAS_URL}/${id}`, payload).pipe(
      map(t => ({
        id_tarea: t.id,
        tema_id: t.temaId,
        titulo: t.titulo,
        descripcion: t.descripcion,
        fecha_apertura: t.fechaApertura,
        fecha_cierre: t.fechaCierre
      }))
    );
  }

  eliminarTarea(id: number): Observable<void> {
    return this._http.delete<void>(`${this.TAREAS_URL}/${id}`);
  }

  // ── CRUD de Exámenes ──────────────────────────────────────────────────────

  getExamenById(id: number): Observable<DbExamen> {
    return this._http.get<any>(`${this.EXAMENES_URL}/${id}`).pipe(
      map(e => ({
        id_examen: e.id,
        tema_id: e.temaId,
        titulo: e.titulo,
        descripcion: e.descripcion,
        fecha_apertura: e.fechaApertura,
        fecha_cierre: e.fechaCierre
      }))
    );
  }

  crearExamen(payload: { titulo: string; descripcion: string; temaId: number; fechaApertura: string; fechaCierre: string }): Observable<DbExamen> {
    return this._http.post<any>(this.EXAMENES_URL, payload).pipe(
      map(e => ({
        id_examen: e.id,
        tema_id: e.temaId,
        titulo: e.titulo,
        descripcion: e.descripcion,
        fecha_apertura: e.fechaApertura,
        fecha_cierre: e.fechaCierre
      }))
    );
  }

  editarExamen(id: number, payload: { titulo: string; descripcion: string; fechaApertura: string; fechaCierre: string }): Observable<DbExamen> {
    return this._http.patch<any>(`${this.EXAMENES_URL}/${id}`, payload).pipe(
      map(e => ({
        id_examen: e.id,
        tema_id: e.temaId,
        titulo: e.titulo,
        descripcion: e.descripcion,
        fecha_apertura: e.fechaApertura,
        fecha_cierre: e.fechaCierre
      }))
    );
  }

  eliminarExamen(id: number): Observable<void> {
    return this._http.delete<void>(`${this.EXAMENES_URL}/${id}`);
  }

  // ── CRUD de Temas (admin/profesor) ────────────────────────────────────────

  private readonly TEMAS_URL = `${environment.apiUrl}/temas`;

  getTemaById(id: number): Observable<DbTema> {
    return this._http.get<any>(`${this.TEMAS_URL}/${id}`).pipe(
      map(t => ({
        id_tema: t.idTema,
        titulo: t.titulo,
        descripcion: t.descripcion,
        asignatura_id: t.asignaturaId
      }))
    );
  }

  crearTema(payload: { titulo: string; descripcion: string; asignaturaId: number }): Observable<DbTema> {
    return this._http.post<any>(this.TEMAS_URL, payload).pipe(
      map(t => ({
        id_tema: t.idTema,
        titulo: t.titulo,
        descripcion: t.descripcion,
        asignatura_id: t.asignaturaId
      }))
    );
  }

  editarTema(id: number, payload: { titulo: string; descripcion: string }): Observable<DbTema> {
    return this._http.put<any>(`${this.TEMAS_URL}/${id}`, payload).pipe(
      map(t => ({
        id_tema: t.idTema,
        titulo: t.titulo,
        descripcion: t.descripcion,
        asignatura_id: t.asignaturaId
      }))
    );
  }

  eliminarTema(id: number): Observable<void> {
    return this._http.delete<void>(`${this.TEMAS_URL}/${id}`);
  }

}
