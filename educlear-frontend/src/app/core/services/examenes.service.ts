import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, throwError } from 'rxjs';
import { environment } from '@/environments/environment';
import { DbIntentoExamen, DbPregunta, DbRespuestaAlumno } from '@core/models/db-models';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService {

  private _http = inject(HttpClient);
  
  private readonly PREGUNTAS_URL = `${environment.apiUrl}/materiales/preguntas`;
  private readonly INTENTOS_URL = `${environment.apiUrl}/materiales/intentos-examen`;
  private readonly RESPUESTAS_URL = `${environment.apiUrl}/materiales/respuestas-alumno`;

  /** Usa el endpoint filtrado del backend: GET /preguntas/examen/{examenId} */
  getPreguntasByExamen(examenId: number): Observable<DbPregunta[]> {
    return this._http.get<any[]>(`${this.PREGUNTAS_URL}/examen/${examenId}`).pipe(
      map(data => data.map(p => ({
        id_pregunta: p.id,
        examen_id: p.examenId,
        texto_pregunta: p.textoPregunta,
        opcion_a: p.opcionA,
        opcion_b: p.opcionB,
        opcion_c: p.opcionC,
        opcion_d: p.opcionD,
        respuesta_correcta: p.respuestaCorrecta
      } as DbPregunta)))
    );
  }

  crearPregunta(payload: { examenId: number; textoPregunta: string; opcionA: string; opcionB: string; opcionC: string; opcionD: string; respuestaCorrecta: string }): Observable<DbPregunta> {
    return this._http.post<any>(this.PREGUNTAS_URL, payload).pipe(
      map(p => ({
        id_pregunta: p.id,
        examen_id: p.examenId,
        texto_pregunta: p.textoPregunta,
        opcion_a: p.opcionA,
        opcion_b: p.opcionB,
        opcion_c: p.opcionC,
        opcion_d: p.opcionD,
        respuesta_correcta: p.respuestaCorrecta
      } as DbPregunta))
    );
  }

  /** Corregido: el backend expone PATCH, no PUT */
  editarPregunta(id: number, payload: { textoPregunta: string; opcionA: string; opcionB: string; opcionC: string; opcionD: string; respuestaCorrecta: string }): Observable<DbPregunta> {
    return this._http.patch<any>(`${this.PREGUNTAS_URL}/${id}`, payload).pipe(
      map(p => ({
        id_pregunta: p.id,
        examen_id: p.examenId,
        texto_pregunta: p.textoPregunta,
        opcion_a: p.opcionA,
        opcion_b: p.opcionB,
        opcion_c: p.opcionC,
        opcion_d: p.opcionD,
        respuesta_correcta: p.respuestaCorrecta
      } as DbPregunta))
    );
  }

  eliminarPregunta(id: number): Observable<void> {
    return this._http.delete<void>(`${this.PREGUNTAS_URL}/${id}`);
  }

  /** Comprueba si ya existe un intento del alumno para el examen (endpoint filtrado del backend) */
  existeIntento(alumnoId: number, examenId: number): Observable<boolean> {
    return this._http.get<boolean>(
      `${this.INTENTOS_URL}/alumno/${alumnoId}/examen/${examenId}/existe`
    );
  }

  getEstadoAlumnosExamen(examenId: number): Observable<any[]> {
    return this._http.get<any[]>(`${this.INTENTOS_URL}/examen/${examenId}/estado-alumnos`);
  }

  getIntento(examenId: number, alumnoId: number): Observable<DbIntentoExamen | undefined> {
    return this._http.get<any>(`${this.INTENTOS_URL}/examen/${examenId}/alumno/${alumnoId}`).pipe(
      map(intento => {
        if (!intento) return undefined;
        return {
          id_intento: intento.id,
          examen_id: intento.examenId,
          alumno_id: intento.alumnoId,
          fecha_inicio: intento.fechaInicio,
          fecha_envio: intento.fechaEnvio,
          calificacion_final: intento.calificacionFinal,
          estado: intento.estado
        } as DbIntentoExamen;
      }),
      catchError(error => {
        if (error.status === 404) {
          return of(undefined);
        }
        return throwError(() => error);
      })
    );
  }

  crearIntento(intento: { examenId: number, alumnoId: number, fechaInicio: string, fechaEnvio: string, estado: string, respuestas: { preguntaId: number, opcionSeleccionada: string }[] }): Observable<any> {
    return this._http.post(this.INTENTOS_URL, intento);
  }

  crearRespuesta(respuesta: { intentoId: number, preguntaId: number, opcionSeleccionada: string }): Observable<any> {
    return this._http.post(this.RESPUESTAS_URL, respuesta);
  }

}
