import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment.development';
import { forkJoin, map, Observable } from 'rxjs';
import { CursosService } from './cursos.service';
import { AsignaturasService } from './asignaturas.service';

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
  private _cursosService = inject(CursosService);
  private _asignaturasService = inject(AsignaturasService);

  private readonly TEMAS_URL = `${environment.apiUrl}/temas`;
  private readonly EXAMENES_URL = `${environment.apiUrl}/materiales/examenes`;
  private readonly TAREAS_URL = `${environment.apiUrl}/materiales/tareas`;
  private readonly INTENTOS_URL = `${environment.apiUrl}/materiales/intentos-examen`;
  private readonly ENTREGAS_URL = `${environment.apiUrl}/materiales/entregas-tarea`;

  getDatosAreaPersonal(alumnoId: number): Observable<AgrupacionPendiente[]> {
    return forkJoin({
      cursos: this._cursosService.getCursosDelAlumno(alumnoId),
      asignaturas: this._asignaturasService.getAsignaturasDelAlumno(alumnoId),
      temas: this._http.get<any[]>(this.TEMAS_URL),
      examenes: this._http.get<any[]>(this.EXAMENES_URL),
      tareas: this._http.get<any[]>(this.TAREAS_URL),
      intentos: this._http.get<any[]>(this.INTENTOS_URL),
      entregas: this._http.get<any[]>(this.ENTREGAS_URL)
    }).pipe(
      map(({ cursos, asignaturas, temas, examenes, tareas, intentos, entregas }) => {
        const ahora = new Date().getTime();
        const itemsPendientes: ItemPendiente[] = [];

        // Filtramos intentos y entregas del alumno actual
        const misIntentos = intentos.filter(i => i.alumnoId === alumnoId);
        const misEntregas = entregas.filter(e => e.alumnoId === alumnoId);

        // Mapas para busqueda rapida
        const cursoMap = new Map(cursos.map(c => [c.id_curso, c]));
        const asignaturaMap = new Map(asignaturas.map(a => [a.id_asignatura, a]));
        const temaMap = new Map(temas.map(t => [t.id, t]));

        // Filtramos temas que pertenecen a las asignaturas del alumno
        const misTemas = temas.filter(t => asignaturaMap.has(t.asignaturaId));
        const misTemasSet = new Set(misTemas.map(t => t.id));

        // Procesar Exámenes
        for (const examen of examenes) {
          if (!misTemasSet.has(examen.temaId)) continue;
          
          const fechaCierreDate = new Date(examen.fechaCierre).getTime();
          if (fechaCierreDate < ahora) continue; // Vencido

          const intento = misIntentos.find(i => i.examenId === examen.id);
          // Si tiene intento y ya fue enviado o calificado, no es pendiente
          if (intento && intento.estado !== 'en_curso') continue;

          const tema = temaMap.get(examen.temaId);
          const asignatura = asignaturaMap.get(tema.asignaturaId);
          const curso = cursoMap.get(asignatura!.curso_id);

          const slugCurso = this.toSlug(curso!.nombre);
          const slugAsignatura = this.toSlug(asignatura!.nombre);
          const slugTema = this.toSlug(tema.titulo);
          const slugExamen = this.toSlug(examen.titulo);

          const temaFormateado = {
            id_tema: tema.id,
            titulo: tema.titulo,
            descripcion: tema.descripcion,
            asignatura_id: tema.asignaturaId
          };

          const examenFormateado = {
            id_examen: examen.id,
            tema_id: examen.temaId,
            titulo: examen.titulo,
            descripcion: examen.descripcion,
            fecha_apertura: examen.fechaApertura,
            fecha_cierre: examen.fechaCierre
          };

          itemsPendientes.push({
            tipo: 'examen',
            id: examen.id,
            titulo: examen.titulo,
            descripcion: examen.descripcion,
            fecha_apertura: examen.fechaApertura,
            fecha_cierre: examen.fechaCierre,
            curso_nombre: curso!.nombre,
            asignatura_nombre: asignatura!.nombre,
            tema_nombre: tema.titulo,
            url: `/cursos/${slugCurso}/${slugAsignatura}/${slugTema}/examen/${slugExamen}`,
            cursoRef: curso,
            asignaturaRef: asignatura,
            temaRef: temaFormateado,
            examenRef: examenFormateado
          });
        }

        // Procesar Tareas
        for (const tarea of tareas) {
          if (!misTemasSet.has(tarea.temaId)) continue;
          
          const fechaCierreDate = new Date(tarea.fechaCierre).getTime();
          if (fechaCierreDate < ahora) continue; // Vencido

          const entrega = misEntregas.find(e => e.tareaId === tarea.id);
          // Si tiene entrega y fue enviada, no es pendiente
          if (entrega && entrega.estadoEntrega === 'enviado') continue;

          const tema = temaMap.get(tarea.temaId);
          const asignatura = asignaturaMap.get(tema.asignaturaId);
          const curso = cursoMap.get(asignatura!.curso_id);

          const slugCurso = this.toSlug(curso!.nombre);
          const slugAsignatura = this.toSlug(asignatura!.nombre);
          const slugTema = this.toSlug(tema.titulo);
          const slugTarea = this.toSlug(tarea.titulo);

          const temaFormateado = {
            id_tema: tema.id,
            titulo: tema.titulo,
            descripcion: tema.descripcion,
            asignatura_id: tema.asignaturaId
          };

          const tareaFormateada = {
            id_tarea: tarea.id,
            tema_id: tarea.temaId,
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            fecha_apertura: tarea.fechaApertura,
            fecha_cierre: tarea.fechaCierre
          };

          itemsPendientes.push({
            tipo: 'tarea',
            id: tarea.id,
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            fecha_apertura: tarea.fechaApertura,
            fecha_cierre: tarea.fechaCierre,
            curso_nombre: curso!.nombre,
            asignatura_nombre: asignatura!.nombre,
            tema_nombre: tema.titulo,
            url: `/cursos/${slugCurso}/${slugAsignatura}/${slugTema}/tarea/${slugTarea}`,
            cursoRef: curso,
            asignaturaRef: asignatura,
            temaRef: temaFormateado,
            tareaRef: tareaFormateada
          });
        }

        // Ordenar primero exámenes, luego tareas. (y si queremos por fecha de cierre)
        itemsPendientes.sort((a, b) => {
          if (a.tipo !== b.tipo) {
            return a.tipo === 'examen' ? -1 : 1;
          }
          return new Date(a.fecha_cierre).getTime() - new Date(b.fecha_cierre).getTime();
        });

        // Agrupar por Asignatura
        const agrupado = new Map<string, AgrupacionPendiente>();
        for (const item of itemsPendientes) {
          const key = `${item.curso_nombre} - ${item.asignatura_nombre}`;
          if (!agrupado.has(key)) {
            agrupado.set(key, {
              curso_nombre: item.curso_nombre,
              asignatura_nombre: item.asignatura_nombre,
              items: []
            });
          }
          agrupado.get(key)!.items.push(item);
        }

        return Array.from(agrupado.values());
      })
    );
  }

  private toSlug(text: string): string {
    return text.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, '-');
  }
}
