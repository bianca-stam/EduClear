import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { Observable, map } from 'rxjs';
import { DbArchivoEntrega, DbEntregaTarea } from '@core/models/db-models';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private _http = inject(HttpClient);
  private readonly ENTREGAS_URL = `${environment.apiUrl}/materiales/entregas-tarea`;

  getEntrega(tareaId: number, alumnoId: number): Observable<DbEntregaTarea | undefined> {
    return this._http.get<any[]>(this.ENTREGAS_URL).pipe(
      map(entregas => entregas.map(e => ({
        id_entrega_tarea: e.id,


        tarea_id: e.tareaId,
        alumno_id: e.alumnoId,
        estado_entrega: e.estadoEntrega,
        calificacion: e.calificacion
      })).find(e => e.tarea_id === tareaId && e.alumno_id === alumnoId))
    );
  }

  crearEntrega(data: any): Observable<DbEntregaTarea> {
    return this._http.post<any>(this.ENTREGAS_URL, data).pipe(
      map(e => ({
        id_entrega_tarea: e.id,
        tarea_id: e.tareaId,
        alumno_id: e.alumnoId,
        estado_entrega: e.estadoEntrega,
        calificacion: e.calificacion
      }))
    );
  }

  actualizarEntrega(id: number, data: any): Observable<DbEntregaTarea> {
    return this._http.patch<any>(`${this.ENTREGAS_URL}/${id}`, data).pipe(
      map(e => ({
        id_entrega_tarea: e.id,
        tarea_id: e.tareaId,
        alumno_id: e.alumnoId,
        estado_entrega: e.estadoEntrega,
        calificacion: e.calificacion
      }))
    );
  }

  subirArchivoEntrega(data: any): Observable<any> {
    return this._http.post<any>(`${environment.apiUrl}/materiales/archivos-entrega`, data);
  }

  actualizarArchivoEntrega(id: number, data: any): Observable<any> {
    return this._http.patch<any>(`${environment.apiUrl}/materiales/archivos-entrega/${id}`, data);
  }

  getArchivosEntrega(entregaId: number): Observable<DbArchivoEntrega[]> {
    return this._http.get<any[]>(`${environment.apiUrl}/materiales/archivos-entrega/entrega/${entregaId}`).pipe(
      map(archivos => archivos.map(a => ({
        id_archivo_tarea: a.id,
        entrega_id: a.entregaId,
        nombre_archivo: a.nombreArchivo,
        tipo_mime: a.tipoMime,
        peso_bytes: a.pesoBytes,
        archivo_blob: a.archivoBlob // Assuming frontend might use this
      })))
    );
  }
}
