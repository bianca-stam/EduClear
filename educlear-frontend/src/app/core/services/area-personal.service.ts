import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { map, Observable } from 'rxjs';
import { toSlug } from '@/app/utils/slug';

export interface ItemPendiente {
  tipo: 'examen' | 'tarea';
  id: number;
  titulo: string;
  descripcion: string;
  fecha_apertura: string;
  fecha_cierre: string;
  curso_nombre: string;
  asignatura_nombre: string;
  tema_nombre: string;
  url: string;
  cursoRef: any;
  asignaturaRef: any;
  temaRef: any;
  tareaRef?: any;
  examenRef?: any;
}

export interface AgrupacionPendiente {
  curso_nombre: string;
  asignatura_nombre: string;
  items: ItemPendiente[];
}

@Injectable({
  providedIn: 'root'
})
export class AreaPersonalService {
  private _http = inject(HttpClient);

  private readonly DASHBOARD_URL = `${environment.apiUrl}/materiales/dashboard`;

  getDatosAreaPersonal(alumnoId: number): Observable<AgrupacionPendiente[]> {
    return this._http.get<any[]>(`${this.DASHBOARD_URL}/alumno/${alumnoId}`).pipe(
      map(grupos => grupos.map(grupo => ({
        curso_nombre: grupo.curso_nombre,
        asignatura_nombre: grupo.asignatura_nombre,
        items: (grupo.items as any[]).map(item => {
          const cursoRef = item.cursoRef ? {
            id_curso: item.cursoRef.id,
            nombre: item.cursoRef.nombre,
            descripcion: item.cursoRef.descripcion || ''
          } : null;

          const asignaturaRef = item.asignaturaRef ? {
            id_asignatura: item.asignaturaRef.id,
            nombre: item.asignaturaRef.nombre,
            curso_id: item.asignaturaRef.cursoId,
            profesor_id: item.asignaturaRef.profesorId
          } : null;

          const temaRef = item.temaRef ? {
            id_tema: item.temaRef.idTema,
            titulo: item.temaRef.titulo,
            descripcion: item.temaRef.descripcion,
            asignatura_id: item.temaRef.asignaturaId
          } : null;

          const tareaRef = item.tareaRef ? {
            id_tarea: item.tareaRef.id,
            tema_id: item.tareaRef.temaId,
            titulo: item.tareaRef.titulo,
            descripcion: item.tareaRef.descripcion,
            fecha_apertura: item.tareaRef.fechaApertura,
            fecha_cierre: item.tareaRef.fechaCierre
          } : undefined;

          const examenRef = item.examenRef ? {
            id_examen: item.examenRef.id,
            tema_id: item.examenRef.temaId,
            titulo: item.examenRef.titulo,
            descripcion: item.examenRef.descripcion,
            fecha_apertura: item.examenRef.fechaApertura,
            fecha_cierre: item.examenRef.fechaCierre
          } : undefined;

          // Generar la URL de navegación igual que antes
          const slugCurso = toSlug(item.curso_nombre);
          const slugAsignatura = toSlug(item.asignatura_nombre);
          const slugTema = toSlug(item.tema_nombre);
          const slugItem = toSlug(item.titulo);
          const tipoUrl = item.tipo === 'examen' ? 'examen' : 'tarea';

          return {
            tipo: item.tipo as 'examen' | 'tarea',
            id: item.id,
            titulo: item.titulo,
            descripcion: item.descripcion,
            fecha_apertura: item.fecha_apertura,
            fecha_cierre: item.fecha_cierre,
            curso_nombre: item.curso_nombre,
            asignatura_nombre: item.asignatura_nombre,
            tema_nombre: item.tema_nombre,
            url: `/cursos/${slugCurso}/${slugAsignatura}/${slugTema}/${tipoUrl}/${slugItem}`,
            cursoRef,
            asignaturaRef,
            temaRef,
            tareaRef,
            examenRef
          } as ItemPendiente;
        })
      } as AgrupacionPendiente)))
    );
  }

}

