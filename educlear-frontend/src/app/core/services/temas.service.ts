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

    // Obtener archivos por ID de tema (filtrado en frontend)
  getArchivosByTema(temaId: number): Observable<DbArchivoContenido[]> {
    return this._http.get<any[]>(this.ARCHIVOS_URL).pipe(
      map(data => data
        .filter(a => a.temaId === temaId)
        .map(a => ({
          id_contenido: a.id,
          tema_id: a.temaId,
          nombre_archivo: a.nombreArchivo,
          tipo_mime: a.tipoMime,
          peso_bytes: a.pesoBytes
        })))
    );
  }

  // Obtener el objeto completo del archivo (incluyendo el blob en base64)
  getArchivoById(archivoId: number): Observable<any> {
    return this._http.get(`${this.ARCHIVOS_URL}/${archivoId}`);
  }

  // Obtener exámenes por ID de tema (filtrado en frontend)
  getExamenesByTema(temaId: number): Observable<DbExamen[]> {
    return this._http.get<any[]>(this.EXAMENES_URL).pipe(
      map(data => data
        .filter(e => e.temaId === temaId)
        .map(e => ({
          id_examen: e.id,
          tema_id: e.temaId,
          titulo: e.titulo,
          descripcion: e.descripcion,
          fecha_apertura: e.fechaApertura,
          fecha_cierre: e.fechaCierre
        })))
    );
  }

  // Obtener tareas por ID de tema (filtrado en frontend)
  getTareasByTema(temaId: number): Observable<DbTarea[]> {
    return this._http.get<any[]>(this.TAREAS_URL).pipe(
      map(data => data
        .filter(t => t.temaId === temaId)
        .map(t => ({
          id_tarea: t.id,
          tema_id: t.temaId,
          titulo: t.titulo,
          descripcion: t.descripcion,
          fecha_apertura: t.fechaApertura,
          fecha_cierre: t.fechaCierre
        })))
    );
  }

}
