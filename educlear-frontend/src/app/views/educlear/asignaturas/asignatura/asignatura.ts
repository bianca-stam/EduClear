import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { DbCalificacionesAlumno, DbTema, DbTarea, DbEntregaTarea } from '@core/models/db-models';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { AuthService } from '@core/services/auth.service';
import { TemasService } from '@core/services/temas.service';
import { TareasService } from '@core/services/tareas.service';
import { UsuarioService } from '@core/services/usuario.service';
import { UsuarioDTO } from '@core/services/auth.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ArrowRight, LucideAngularModule, AlertCircle, Loader, Pencil, Trash2, FileDown, Save } from "lucide-angular";
import { FormsModule } from '@angular/forms';

import { ConfirmModal } from '@app/components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-asignatura',
  imports: [NgbNavModule, LucideAngularModule, RouterOutlet, DecimalPipe, ConfirmModal, FormsModule],
  templateUrl: './asignatura.html',
  styleUrl: './asignatura.scss'
})
export class Asignatura implements OnInit{

  asignaturasService = inject(AsignaturasService);
  authService = inject(AuthService);
  asignaturaSeleccionada = this.asignaturasService.asignaturaSeleccionada;
  temaService = inject(TemasService);
  tareasService = inject(TareasService);
  usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  arrowRight = ArrowRight;
  alertCircle = AlertCircle;
  loader = Loader;
  pencil = Pencil;
  trash = Trash2;
  fileDown = FileDown;
  save = Save;

  temas = signal<DbTema[]>([]);
  promedios = signal<DbCalificacionesAlumno[]>([]);
  entregasProfesor = signal<any[]>([]);
  savingGrade = signal<number | null>(null);

  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

  ngOnInit(): void {
    const idAsignatura = this.asignaturaSeleccionada()!.id_asignatura;
    const idUsuario = this.authService.usuarioActual()!.id;

    if (this.puedeEditarAsignatura()) {
      this.asignaturasService.getTemasByAsignatura(idAsignatura).pipe(
        switchMap(temas => {
          this.temas.set(temas);
          if (temas.length === 0) {
            return of({ tareas: [], entregas: [], usuarios: [] });
          }
          const tareasObs = temas.map(t => this.temaService.getTareasByTema(t.id_tema));
          return forkJoin(tareasObs).pipe(
            switchMap(tareasPorTema => {
              const allTareas = tareasPorTema.flat();
              if (allTareas.length === 0) {
                return of({ tareas: [], entregas: [], usuarios: [] });
              }
              return forkJoin({
                tareas: of(allTareas),
                entregas: this.tareasService.getAllEntregas(),
                usuarios: this.usuarioService.getAllUsers()
              });
            })
          );
        })
      ).subscribe({
        next: (data: any) => {
          if (data.tareas && data.entregas && data.usuarios) {
            const tareasMap = new Map<number, DbTarea>(data.tareas.map((t: DbTarea) => [t.id_tarea, t]));
            const usuariosMap = new Map<number, UsuarioDTO>(data.usuarios.map((u: UsuarioDTO) => [u.id, u]));

            const entregasFiltradas = data.entregas
              .filter((e: DbEntregaTarea) => tareasMap.has(e.tarea_id) && e.estado_entrega === 'enviado')
              .map((e: DbEntregaTarea) => ({
                id_entrega_tarea: e.id_entrega_tarea,
                tarea_id: e.tarea_id,
                alumno_id: e.alumno_id,
                tareaNombre: tareasMap.get(e.tarea_id)?.titulo || 'Desconocida',
                alumnoNombre: usuariosMap.get(e.alumno_id)?.username || 'Desconocido',
                estado_entrega: e.estado_entrega,
                calificacion: e.calificacion,
                nuevaNota: e.calificacion
              }));
            
            this.entregasProfesor.set(entregasFiltradas);
          }
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error al cargar datos de la asignatura (profesor):', err);
          this.errorMsg.set('No se pudieron cargar los datos de la asignatura.');
          this.isLoading.set(false);
        }
      });
    } else {
      forkJoin({
        temas: this.asignaturasService.getTemasByAsignatura(idAsignatura),
        promedios: this.asignaturasService.getPromediosPorAlumnoYAsignatura(idUsuario, idAsignatura)
      }).subscribe({
        next: ({ temas, promedios }) => {
          this.temas.set(temas);
          this.promedios.set(promedios);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error al cargar datos de la asignatura:', err);
          this.errorMsg.set('No se pudieron cargar los datos de la asignatura.');
          this.isLoading.set(false);
        }
      });
    }
  }

  isTemaSelected() {
    return this.route.firstChild !== null;
  }

  verTema(tema: DbTema) {
    const slug = tema.titulo.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, '-');
      
    this.temaService.temaSeleccionado.set(tema);
    this.router.navigate([slug], { relativeTo: this.route });
  }

  isCalificacionSelected() {
    return this.route.firstChild !== null;
  }

  puedeEditarAsignatura(): boolean {
    const usuario = this.authService.usuarioActual();
    const asig = this.asignaturaSeleccionada();
    if (!usuario || !asig) return false;
    if (usuario.rol === 'admin') return true;
    return usuario.rol === 'profesor' && asig.profesor_id === usuario.id;
  }

  editarTema(event: Event, tema: DbTema) {
    event.stopPropagation();
    this.router.navigate(['/edicion/tema', tema.id_tema]);
  }

  nuevoTema() {
    const asigId = this.asignaturaSeleccionada()?.id_asignatura;
    if (asigId) {
      this.router.navigate(['/edicion/tema/nuevo'], { queryParams: { asignaturaId: asigId } });
    }
  }

  // ── Modal de Confirmación ────────────────────────────────────────────────
  mostrarModalConfirmacion = signal(false);
  itemAEliminar = signal<DbTema | null>(null);

  eliminarTema(event: Event, tema: DbTema) {
    event.stopPropagation();
    this.itemAEliminar.set(tema);
    this.mostrarModalConfirmacion.set(true);
  }

  cerrarConfirmacion() {
    this.mostrarModalConfirmacion.set(false);
    this.itemAEliminar.set(null);
  }

  confirmarEliminacion() {
    const tema = this.itemAEliminar();
    if (!tema) return;
    
    this.temaService.eliminarTema(tema.id_tema).subscribe({
      next: () => {
        this.temas.update(list => list.filter(t => t.id_tema !== tema.id_tema));
        this.cerrarConfirmacion();
      },
      error: () => {
        alert('No se pudo eliminar el tema.');
        this.cerrarConfirmacion();
      }
    });
  }

  descargarArchivo(entregaId: number) {
    this.tareasService.getArchivosEntrega(entregaId).subscribe({
      next: (archivos) => {
        if (archivos && archivos.length > 0) {
          const archivo = archivos[0];
          if (archivo.archivo_blob) {
            const byteCharacters = atob(archivo.archivo_blob);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: archivo.tipo_mime || 'application/octet-stream' });
            
            const url = URL.createObjectURL(blob);
            const enlace = document.createElement('a');
            enlace.href = url;
            enlace.download = archivo.nombre_archivo;
            enlace.click();
            URL.revokeObjectURL(url);
          } else {
            alert('El archivo no tiene contenido binario válido.');
          }
        } else {
          alert('El alumno no ha adjuntado ningún archivo.');
        }
      },
      error: (err) => {
        console.error('Error al obtener archivo', err);
        alert('Hubo un error al descargar el archivo.');
      }
    });
  }

  guardarNota(entrega: any) {
    if (entrega.nuevaNota === null || entrega.nuevaNota < 1 || entrega.nuevaNota > 10) {
      alert('La nota debe estar entre 1 y 10.');
      return;
    }

    this.savingGrade.set(entrega.id_entrega_tarea);
    this.tareasService.actualizarEntrega(entrega.id_entrega_tarea, { calificacion: entrega.nuevaNota }).subscribe({
      next: (res) => {
        entrega.calificacion = res.calificacion;
        this.savingGrade.set(null);
      },
      error: () => {
        alert('Error al guardar la nota.');
        this.savingGrade.set(null);
      }
    });
  }
}
