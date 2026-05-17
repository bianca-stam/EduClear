import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { DbCalificacionesAlumno, DbTema } from '@core/models/db-models';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { AuthService } from '@core/services/auth.service';
import { TemasService } from '@core/services/temas.service';
import { TareasService } from '@core/services/tareas.service';
import { UsuarioService } from '@core/services/usuario.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { ArrowRight, LucideAngularModule, AlertCircle, Loader, Pencil, Trash2, FileDown, Save } from "lucide-angular";
import { FormsModule } from '@angular/forms';

import { ConfirmModal } from '@app/components/confirm-modal/confirm-modal';
import { toSlug } from '@/app/utils/slug';

@Component({
  selector: 'app-asignatura',
  imports: [NgbNavModule, LucideAngularModule, RouterOutlet, DecimalPipe, ConfirmModal, FormsModule],
  templateUrl: './asignatura.html',
  styleUrl: './asignatura.scss'
})
export class Asignatura implements OnInit{

  // ── Inyecciones ──────────────────────────────────────────────────────────
  asignaturasService = inject(AsignaturasService);
  authService = inject(AuthService);
  asignaturaSeleccionada = this.asignaturasService.asignaturaSeleccionada;
  temaService = inject(TemasService);
  tareasService = inject(TareasService);
  usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  // ── Iconos ───────────────────────────────────────────────────────────────
  arrowRight = ArrowRight;
  alertCircle = AlertCircle;
  loader = Loader;
  pencil = Pencil;
  trash = Trash2;
  fileDown = FileDown;
  save = Save;

  // ── Estado ───────────────────────────────────────────────────────────────
  temas = signal<DbTema[]>([]);
  promedios = signal<DbCalificacionesAlumno[]>([]);
  entregasProfesor = signal<any[]>([]);
  savingGrade = signal<number | null>(null);

  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

  // ── Lifecycle ────────────────────────────────────────────────────────────
  ngOnInit(): void {
    const idAsignatura = this.asignaturaSeleccionada()!.id_asignatura;
    const idUsuario = this.authService.usuarioActual()!.id;

    if (this.puedeEditarAsignatura()) {
      forkJoin({
        temas: this.asignaturasService.getTemasByAsignatura(idAsignatura),
        entregas: this.tareasService.getEntregasAsignatura(idAsignatura)
      }).subscribe({
        next: ({ temas, entregas }) => {
          this.temas.set(temas);
          
          const entregasFiltradas = entregas
            .filter((e: any) => e.estadoEntrega === 'enviado')
            .map((e: any) => ({
              id_entrega_tarea: e.idEntregaTarea,
              tarea_id: e.tareaId,
              alumno_id: e.alumnoId,
              tareaNombre: e.tareaNombre || 'Desconocida',
              alumnoNombre: e.alumnoNombre || 'Desconocido',
              estado_entrega: e.estadoEntrega,
              calificacion: e.calificacion,
              nuevaNota: e.calificacion
            }));
            
          this.entregasProfesor.set(entregasFiltradas);
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

  // ── Métodos de Ayuda ─────────────────────────────────────────────────────
  isTemaSelected() {
    return this.route.firstChild !== null;
  }

  // ── Navegación ────────────────────────────────────────────────────────────
  verTema(tema: DbTema) {
    const slug = toSlug(tema.titulo);
      
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

  // ── Gestión de Profesores/Admin ──────────────────────────────────────────
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

  // ── Gestión de Entregas y Calificaciones ──────────────────────────────────
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
