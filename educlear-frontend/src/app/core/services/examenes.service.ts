import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@/environments/environment.development';
import { DbIntentoExamen, DbPregunta, DbRespuestaAlumno } from '@core/models/db-models';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService {

  private _http = inject(HttpClient);
  
  private readonly PREGUNTAS_URL = `${environment.apiUrl}/materiales/preguntas`;
  private readonly INTENTOS_URL = `${environment.apiUrl}/materiales/intentos-examen`;
  private readonly RESPUESTAS_URL = `${environment.apiUrl}/materiales/respuestas-alumno`;

  getPreguntasByExamen(examenId: number): Observable<DbPregunta[]> {
    return this._http.get<any[]>(this.PREGUNTAS_URL).pipe(
      map(data => data
        .filter(p => p.examenId === examenId)
        .map(p => ({
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

  getIntento(examenId: number, alumnoId: number): Observable<DbIntentoExamen | undefined> {
    return this._http.get<any[]>(this.INTENTOS_URL).pipe(
      map(data => {
        const intento = data.find(i => i.examenId === examenId && i.alumnoId === alumnoId);
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
      })
    );
  }

  crearIntento(intento: { examenId: number, alumnoId: number, fechaInicio: string, fechaEnvio: string, calificacionFinal: number, estado: string }): Observable<any> {
    return this._http.post(this.INTENTOS_URL, intento);
  }

  crearRespuesta(respuesta: { intentoId: number, preguntaId: number, opcionSeleccionada: string }): Observable<any> {
    return this._http.post(this.RESPUESTAS_URL, respuesta);
  }

}
